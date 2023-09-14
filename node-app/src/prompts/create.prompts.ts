import {ComposerDocument, DocumentType} from 'common/dist/types/ComposerDocument.js';
import {FictionSectionPromptTemplate, ResumeCoverLetterPromptTemplate} from './PromptTemplates.js';
import {PromptTemplate} from 'langchain';

export const createFictionPrompt = `
You have been tasked with helping a user create a work of fiction. 
`;

export const createResumePrompt = `
You have been tasked with helping a user create a resume and a cover letter for a particular job.
`

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

 async function getPromptForResumeDoc(document: ComposerDocument) {
    const promptTemplate = ResumeCoverLetterPromptTemplate;
    const personal = document.metaData.find(item => item.label === "Personal")?.content || "";
    const resume = document.metaData.find(item => item.label === "Resume")?.content || "";
    const reason = document.metaData.find(item => item.label === "Reason")?.content || "";
    const style = document.metaData.find(item => item.label === "Style")?.content || "";
    const description = document.metaData.find(item => item.label === "Description")?.content || "";
    const modelInput = await promptTemplate.format({
        personal,
        resume,
        reason,
        style,
        description,
    });

    return modelInput;
}

async function getPromptForFictionDoc(document: ComposerDocument) {
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
}

function getSysPromptForDocType(DocType: DocumentType, document: ComposerDocument): string {
    switch (DocType) {
        case DocumentType.Fiction:
            return createFictionPrompt;
        case DocumentType.ResumeCoverLetter:
            return createResumePrompt;
        default:
            return "You are a document writing assistant";
    }
}

export async function getPromptForDocType(DocType: DocumentType, document: ComposerDocument): Promise<[string, string]> {
    const sysPrompt = getSysPromptForDocType(DocType, document);
    switch (DocType) {
        case DocumentType.Fiction:
            return [sysPrompt, await getPromptForFictionDoc(document)];

        case DocumentType.ResumeCoverLetter:
            return [sysPrompt, await getPromptForResumeDoc(document)];

        default:
            return [sysPrompt, createFictionPrompt];
    }
}