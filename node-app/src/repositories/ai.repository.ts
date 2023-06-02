/*
todo
- make a repository for AI
- connect langchain
- make outline generator
- make a function that pickes a single thing out of the outline and makes a paragraph
 */

class AIRepository {
    static documentStore = new Map<string, object>();
    constructor() {
    }
    async createDocument(id: string, document: object) {
        AIRepository.documentStore.set(id, document);
    }

    async getDocument(id: string) {
        return AIRepository.documentStore.get(id);
    }
}

export default new AIRepository();