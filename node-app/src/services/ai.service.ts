import {HttpError} from "../util/HttpError";
import {randomUUID} from "crypto";
import { OpenAI } from "langchain/llms/openai";
import {getPromptForDocType} from '../prompts/create.prompts';
import {ComposerDocument} from 'common';
import {taskListParser, taskListPrompt} from '../prompts/PromptTemplates';

const OPENAI_API_KEY=process.env.OPENAI_API_KEY

class AiService {

    async create(data: ComposerDocument) {
        // this is some new stuff
        const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0.9, maxTokens: 1200 });

        const prompt = getPromptForDocType(data.documentType)

        const input = await taskListPrompt.format({
            question: prompt,
        });
        console.log("prompt: \n", input);

        const response = await model.call(input);

        const res = await model.call(prompt);

        console.log(typeof res);

        const parsedResponse: any = await taskListParser.parse(response);

        console.log(parsedResponse);

        return parsedResponse
    }
    async process(data: any) {
        // this is some new stuff

        const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0.9 });
        const prompt = "This is a test: " + data;
        console.log("prompt", prompt);
        const res = await model.call(
            prompt
        );
        console.log(typeof res);
        return res
    }
}


export default new AiService()