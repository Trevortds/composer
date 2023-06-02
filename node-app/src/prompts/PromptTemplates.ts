import { z } from 'zod';
import {PromptTemplate} from 'langchain';
import {CommaSeparatedListOutputParser, StructuredOutputParser} from 'langchain/output_parsers';
import {OpenAI} from 'langchain/llms/openai';

export const taskListParser = StructuredOutputParser.fromZodSchema(
    z.array(z.object({
        task: z.string().describe("A task to be accomplished"),
        tips: z
            .array(z.string())
            .describe("Tips for accomplishing the task"),
    })).describe("List of tasks to be accomplished to complete the user's goal")
);

const taskListFormatInstructions = taskListParser.getFormatInstructions();

export const taskListPrompt = new PromptTemplate({
    template:
        "You are a document writing assistant. Provide a response below in the directed format that fullfills the prompt to follow. \n{format_instructions}\n{question}",
    inputVariables: ["question"],
    partialVariables: { format_instructions: taskListFormatInstructions },
});

