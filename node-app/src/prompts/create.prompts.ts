import {DocumentType} from 'common/src/types/ComposerDocument';

export const createFictionPrompt = `
You have been tasked with helping a user create a work of fiction. The first step of the process is to provide a list
of todo items for the user to complete. What are some steps necessary to begin crafting a work of fiction? 

Please be detailed, and provide a wide variety of steps and tips. The provided steps should be actionable, and should
serve as both a to do list for the user, and a outline for the document to be created.
`;

export function getPromptForDocType(DocType: DocumentType) {
    switch (DocType) {
        case DocumentType.Fiction:
            return createFictionPrompt;
        default:
            return createFictionPrompt;
    }
}