import {HttpError} from "../util/HttpError";
import {randomUUID} from "crypto";
import { OpenAI } from "langchain/llms/openai";
import {getPromptForDocType} from '../prompts/create.prompts';
import {ComposerDocument} from 'common';
import {taskListParser, TaskListParserOutput, taskListPrompt} from '../prompts/PromptTemplates';
import aiRepository from '../repositories/ai.repository';
import {OutputFixingParser} from 'langchain/output_parsers';
import {ChatOpenAI} from 'langchain/chat_models';

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
        // this is some new stuff
        const model = new OpenAI({openAIApiKey: OPENAI_API_KEY, temperature: 0.9, maxTokens: 1200});

        const prompt = getPromptForDocType(data.documentType)

        const input = await taskListPrompt.format({
            question: prompt,
        });
        console.log("prompt: \n", input);

        const response = await model.call(input);

        const res = await model.call(prompt);

        console.log(typeof res);
        console.log(res);

        let parsedResponse: Array<TaskListParserOutput>;

        try {
            parsedResponse = await taskListParser.parse(response);

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
                taskListParser
            );
            parsedResponse = await fixParser.parse(response);
            console.log("Fixed output: ", parsedResponse);
            // Fixed output:  { answer: 'foo', sources: [ 'foo.com' ] }
        }

        console.log(parsedResponse);

        const id = randomUUID()
        data.metaData = parsedResponse.map((item) => {
            return {
                id: randomUUID(),
                content: "",
                ...item
            }
        });
        const newDoc = await aiRepository.createDocument(id, data)

        return newDoc
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
}


export default new AiService()