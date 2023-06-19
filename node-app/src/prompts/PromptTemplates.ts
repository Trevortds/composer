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
                "prompt content": "",
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

export interface OutlineParserOutput {
    title: string;
    label: string;
    allowsChildren: boolean;
    content: string;
}

const OutlineParserSectionSchema = z.object({
    title: z.string().describe("The title of the section of the document to be written"),
    label: z.string().describe("The label of the section or piece of document"),
    allowsChildren: z.boolean().describe("Whether the document section can have children (subsections, subheadings, chapters, etc)"),
    content: z.string().describe("The content of the document section, or a summary of the subsections"),
});

type Section = z.infer<typeof OutlineParserSectionSchema> & {
    children: Section[];
};

const recursiveSectionSchema: z.ZodType<Section> = OutlineParserSectionSchema.extend({
    children: z.lazy(() => recursiveSectionSchema.array()),
});

export const OutlineGeneratorParser = StructuredOutputParser.fromZodSchema(
    z.array(recursiveSectionSchema).describe("A section of the document that the user will have to write")
);

const outlineListFormatInstructions = OutlineGeneratorParser.getFormatInstructions();

/*
Changpe the input variables to be the metadata items, and the partial variables to be the format instructions,
make hte llm fill out the outline instead ot fhe metadata
fetch some stuff from websites/databases when necessary?
 */

// todo, play with this prompt some more, see if changing the order of elements changes the output
export const FictionSectionPromptTemplate = new PromptTemplate({
    template:
        "You are a document writing assistant, producing a work of fiction. Produce a document outline and fill in the content of that outlne, informed by the following metadata to start. \n{format_instructions}\nSummary: {summary}\nSetting: {setting}\nCharacters: {characters}\nStyle: {style}\nLength: {length}\n Please now take this information and generate a document outline of the story in the specified format, including the final text in the content fields whenever possible. Use the provided length information as a guide for how many sections to produce in the outline and the depth of children. Please provide several hundred tokens of final text in each of the content fields.", //\nOutline: {outline}
    inputVariables: ["summary", "setting", "characters", "style", "length"],
    partialVariables: { format_instructions: outlineListFormatInstructions },
});

