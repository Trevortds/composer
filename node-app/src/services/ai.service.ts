import {HttpError} from "../util/HttpError.js";
import {randomUUID} from "crypto";
import { OpenAI } from "langchain/llms/openai";
import openai from "openai";
import {
    ChatPromptTemplate,
    PromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
} from "langchain/prompts";
import {
    HumanChatMessage,
    SystemChatMessage,
} from "langchain/schema";

import {createFictionPrompt, getPromptForDocType} from '../prompts/create.prompts.js';
import {ComposerDocument, Section} from 'common';
import aiRepository from '../repositories/ai.repository.js';
import {OutputFixingParser} from 'langchain/output_parsers';
import {ChatOpenAI} from 'langchain/chat_models/openai';
import {
    OutlineGeneratorParser,
    OutlineParserOutput
} from '../prompts/PromptTemplates.js';
import {blankFictionDocument} from '../assets/initial.data.js';

const OPENAI_API_KEY=process.env.OPENAI_API_KEY

class AiService {

    async get(id: string) {
        const doc = await aiRepository.getDocument(id)
        if (!doc) {
            throw new HttpError("Document not found", 404);
        }
        return doc
    }

    async getAll() {
        const docs = await aiRepository.getAllDocuments()
        return docs
    }

    async create(data: ComposerDocument) {

        // break this out in to a separate function that creates the outline, that outline method can be used separately from document creation

        // this is some new stuff
        // take the metadatata, put it into the prompt, generate the outline that came from the template
        // manage templates in common folder
        // put a stept where if metadata is missing, fill it with some static stuff for now, but in the future we can get it from the llm

        const outline = await this.generateOutline(data);

        // todo move this so that it's not always a fiction document todo
        const newDoc = { ...blankFictionDocument(), ...data };
        newDoc.id = randomUUID();
        // @ts-ignore
        newDoc.outline = outline.map((item: Section) => {
            return {
                ...item,
                id: randomUUID(),
                content: "",
            }
        });
        newDoc.documentType = data.documentType;
        return await aiRepository.createDocument(newDoc.id, newDoc)
    }

    async generateOutline(data: ComposerDocument) {
        // const model = new OpenAI({modelName: "gpt-35-turbo", openAIApiKey: OPENAI_API_KEY, temperature: 0.9, maxTokens: -1});

        // openai.apiType = "azure";
        // // # Configure Azure OpenAI Service API
        // openai.api_type = "azure"
        // openai.api_version = "2023-03-15-preview"
        // openai.api_base = os.getenv('OPENAI_API_BASE')
        // openai.api_key = os.getenv("OPENAI_API_KEY")

        // furure work: use this to make a chain https://python.langchain.com/docs/use_cases/question_answering/how_to/chat_vector_db
        //
        // // Init LLM and embeddings model
        // const model = AzureChatOpenAI(deployment_name="gpt-35-turbo", temperature=0.7, openai_api_version="2023-03-15-preview")
        const model = new ChatOpenAI({modelName:"gpt-4", openAIApiKey: OPENAI_API_KEY, temperature: 0.7, maxTokens: -1});
        // Pass in a list of messages to `call` to start a conversation. In this simple example, we only pass in one message.
/*
from langchain.chat_models import ChatOpenAI
from langchain.llms import OpenAI
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)

        question_details = generate_question_details(transcript)
        sys_prompt, prompt = gen_prompt(row["call reason"], question_details)
        # print(sys_prompt)
        # print(prompt)
        messages = [
            SystemMessage(content=sys_prompt),
            HumanMessage(content=prompt)
        ]
        evaluator_response = llm(messages).content
 */


        const combinedPrompt = await getPromptForDocType(data.documentType, data)
        const sysPrompt = combinedPrompt[0];
        const prompt = combinedPrompt[1];
        console.log("prompt: \n", prompt);

        const messages = [
            new SystemChatMessage(sysPrompt),
            new HumanChatMessage(prompt)
        ]
        console.log("messages: \n", messages);
        const response = await model.call(messages);
        // const response = await chat.call([
        //     new HumanChatMessage(
        //         "What is a good name for a company that makes colorful socks?"
        //     ),
        // ]);

        // console.log(response);

        // const response = await model.call(prompt);
        // const response = await model.call([
        //         new HumanChatMessage(
        //             prompt
        //         ),
        //     ]);
        console.log("response: \n", response.text);

        let parsedResponse: Array<OutlineParserOutput>;

        try {
            parsedResponse = await OutlineGeneratorParser.parse(response.text);

        } catch (e) {
            console.log("Failed to parse bad output: ", e);
            /*
            Failed to parse bad output:  OutputParserException [Error]: Failed to parse. Text: ```json
              {
                "answer": "foo",
                "sources": "foo.com"
              }
              ```. Error: [
              {
                "code": "invalid_type",
                "expected": "array",
                "received": "string",
                "path": [
                  "sources"
                ],
                "message": "Expected array, received string"
              }
            ]
            at StructuredOutputParser.parse (/Users/ankushgola/Code/langchainjs/langchain/src/output_parsers/structured.ts:71:13)
            at run (/Users/ankushgola/Code/langchainjs/examples/src/prompts/fix_parser.ts:25:18)
            at <anonymous> (/Users/ankushgola/Code/langchainjs/examples/src/index.ts:33:22)
           */

            const fixParser = OutputFixingParser.fromLLM(
                new ChatOpenAI({temperature: 0}),
                OutlineGeneratorParser
            );
            parsedResponse = await fixParser.parse(response.text);
            console.log("Fixed output: ", parsedResponse);
        }

        console.log(parsedResponse);
        return parsedResponse;
    }
    async process(data: any) {

        const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0.9 });
        const prompt = "This is a test: " + data;
        console.log("prompt", prompt);
        const res = await model.call(
            prompt
        );
        console.log(typeof res);
        return res
    }

    async update(id: string, data: any) {
        // even though this would work without the check, we should still return 404 if you try to put to a resource that doesn't exist yet
        // this isn't strictly restful, but I think it's best practice.
        const doc = await aiRepository.getDocument(id)
        if (!doc) {
            throw new HttpError("Document not found", 404);
        }
        const res = await aiRepository.updateDocument(id, data)

        return res
    }

    async updateOutline(id: string, data: any) {
        // even though this would work without the check, we should still return 404 if you try to put to a resource that doesn't exist yet
        // this isn't strictly restful, but I think it's best practice.
        const doc = await aiRepository.getDocument(id)
        if (!doc) {
            throw new HttpError("Document not found", 404);
        }

        const outline = await this.generateOutline(data);

        // todo move this so that it's not always a fiction document todo
        const newDoc = { ...data };
        // @ts-ignore
        newDoc.outline = outline.map((item: Section) => {
            return {
                ...item,
                id: randomUUID(),
                content: "",
            }
        });

        const res = await aiRepository.updateDocument(id, newDoc)

        return res
    }


}


export default new AiService()