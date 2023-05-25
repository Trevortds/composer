/*
todo
- make a repository for AI
- connect langchain
- make outline generator
- make a function that pickes a single thing out of the outline and makes a paragraph
 */

class AIRepository {
    static documentStore = Map<string, object>();
    constructor() {
    }
    async createDocument(id, document) {
        this.documentStore.set(id, document);
    }

    async getDocument(id) {
        return this.documentStore.get(id);
    }
}

export default new AIRepository();