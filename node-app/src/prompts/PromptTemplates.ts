import { z } from 'zod';
import {CommaSeparatedListOutputParser, StructuredOutputParser} from 'langchain/output_parsers';
import {OpenAI} from 'langchain/llms/openai';
import {PromptTemplate} from 'langchain';

/*
[
    {
        "id": "fiction-book-template",
        "metaData": [
            {
                "id": "1",
                "title": "Plot Summary",
                "label": "Summary",
                "content": "",
                "icon": "font_download",
                "allowsChildren": false,
                "instructions": "Provide a summary of the plot for your story"
            },
            {
                "id": "2",
                "title": "Setting and Timeline",
                "label": "Setting",
                "content": "",
                "icon": "warning",
                "allowsChildren": false,
                "instructions": "What is the setting, era, and timeline of your story.  Describe it here."
            },
            {
                "id": "3",
                "title": "Characters",
                "label": "Characters",
                "content": "",
                "icon": "today",
                "allowsChildren": true,
                "instructions": "Add your characters here"
            },
            {
                "id": "4",
                "title": "Writing Style",
                "label": "Style",
                "content": "",
                "icon": "print",
                "allowsChildren": false,
                "instructions": "Describe the writing style you would like to use.  Like one of your favor authors or a genre."
            },
            {
                "id": "5",
                "title": "Length of Book",
                "label": "Length",
                "content": "",
                "icon": "style",
                "allowsChildren": false,
                "instructions": "How long do you want this story to be in pages, chapters or sentences."
            }
        ],
        "docOutline": [
            {
                "id": "chapter1",
                "label": "Chapter 1",
                "title": "Chapter 1",
                "content": "",
                "type": "textarea",
                "allowsChildren": true
            }
        ],
        "title": "",
        "author": "",
        "documentType": "Fiction"
    }
]
*/

export interface TaskListParserOutput {
    title: string;
    label: string;
    allowsChildren: boolean;
    instructions: string;
    tips: string[];
}

export const taskListParser = StructuredOutputParser.fromZodSchema(
    z.array(z.object({
        title: z.string().describe("The title of the task or piece of document metadata"),
        label: z.string().describe("The label of the task or piece of document metadata"),
        allowsChildren: z.boolean().describe("Whether the task or piece of document metadata allows children/subtasks"),
        instructions: z.string().describe("Instructions for accomplishing the task"),
        tips: z
            .array(z.string())
            .describe("Tips for accomplishing the task"),
    })).describe("A piece of metadata about the document to be prepared by the user")
);

const taskListFormatInstructions = taskListParser.getFormatInstructions();

export const taskListPrompt = new PromptTemplate({
    template:
        "You are a document writing assistant. Provide a response below in the directed format that fullfills the prompt to follow. \n{format_instructions}\n{question}",
    inputVariables: ["question"],
    partialVariables: { format_instructions: taskListFormatInstructions },
});

