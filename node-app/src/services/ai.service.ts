import {HttpError} from "../util/HttpError";
import {randomUUID} from "crypto";
import { OpenAI } from "langchain/llms/openai";

const OPENAI_API_KEY=process.env.OPENAI_API_KEY

class AiService {
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