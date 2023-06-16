

import {ComposerDocument} from 'common';
import {fictionBookTemplate} from '../assets/initial.data';

class AIRepository {
    static documentStore = new Map<string, ComposerDocument>();
    constructor() {
        AIRepository.documentStore.set('fiction-book-template', fictionBookTemplate);
    }
    async createDocument(id: string, document: ComposerDocument) {
        AIRepository.documentStore.set(id, document);
        return document;
    }

    async getDocument(id: string) {
        return AIRepository.documentStore.get(id);
    }

    async getAllDocuments() {
        return Array.from(AIRepository.documentStore.values());
    }

    async updateDocument(id: string, document: ComposerDocument) {
        AIRepository.documentStore.set(id, document);
        return document;
    }
}

export default new AIRepository();