import { defineStore } from 'pinia';
import {fictionBookTemplate} from 'components/TypesTemplates';
import {ComposerDocument} from 'common';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';

export const useAiDocumentStore = defineStore('counter', {
  state: () => ({
    currentDocument: undefined as ComposerDocument | undefined,
    documentList: [] as Array<ComposerDocument>,
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    // currentDocument: state => state.currentDocument
  },
  actions: {
    async createDocument(document: ComposerDocument) {
      api.post(`ai/`, document).then((response) => {
        console.log(response);
        this.currentDocument = response.data
      }).catch((error) => {
        console.log(error);
      });
    },
    async updateDocument(document: ComposerDocument) {
      api.post(`ai/${document.id}`, document).then((response) => {
        console.log(response);
        this.currentDocument = response.data
      }).catch((error) => {
        console.log(error);
      });
    },
    async getDocument(id: string) {
      api.get(`ai/${id}`).then((response) => {
        console.log(response);
        this.currentDocument = response.data
      }).catch((error) => {
        console.log(error);
      })
    },
    async init() {
      return api.get(`ai/`).then((response: AxiosResponse<Array<ComposerDocument>>) => {
        console.log(response);
        this.documentList = response.data;
        this.currentDocument = response.data[0] || fictionBookTemplate;
      }).catch((error) => {
        console.log(error);
        this.currentDocument = fictionBookTemplate;
        // this is some mock data in case the api is broken
      })
    }
  },
});
