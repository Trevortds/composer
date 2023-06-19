import {ComposerDocument, DocumentType} from 'common/src/types/ComposerDocument';
import {FictionSectionPromptTemplate} from './PromptTemplates';

export const createFictionPrompt = `
You have been tasked with helping a user create a work of fiction. The first step of the process is to provide a list
of document metadata elements to serve as todo items for the user to complete. 
What are some steps necessary to begin crafting a work of fiction? 

Please be detailed, and provide a wide variety of steps and tips. The provided steps should be actionable, and should
serve as both a to do list for the user, and a outline for the document to be created.
`;

const exampleDoc = {
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


export async function getPromptForDocType(DocType: DocumentType, document: ComposerDocument) {
    switch (DocType) {
        case DocumentType.Fiction:
            const promptTemplate = FictionSectionPromptTemplate;
            const summary = document.metaData.find(item => item.label === "Summary")?.content || "";
            const setting = document.metaData.find(item => item.label === "Setting")?.content || "";
            const characters = document.metaData.find(item => item.label === "Characters")?.content || "";
            const style = document.metaData.find(item => item.label === "Style")?.content || "";
            const length = document.metaData.find(item => item.label === "Length")?.content || "";
            const modelInput = await promptTemplate.format({
                summary,
                setting,
                characters,
                style,
                length,
            });

            return modelInput;

        default:
            return createFictionPrompt;
    }
}