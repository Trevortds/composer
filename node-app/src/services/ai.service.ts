import {HttpError} from "../util/HttpError";
import {randomUUID} from "crypto";
import { OpenAI } from "langchain/llms/openai";

const OPENAI_API_KEY="..."

class AiService {
    process(data: any): string {
        // this is some new stuff

        const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0.9 });
        const prompt = "This is a test";
        const result = model.complete(prompt);
        console.log(result);


        return result


    }
}


export default new AiService()