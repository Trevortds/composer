import {Request, Response} from "express";
import aiService from "../services/ai.service.js"
import { ComposerDocument } from "common/dist/types/ComposerDocument.js";

class AiController {

    async createNewDocument(req: Request, res: Response){
        try {
            const requestData = req.body as ComposerDocument;
            const result = await aiService.create(requestData)
            console.log(result);
            res.status(201).send({ "result": result })
        } catch (e) {
            console.log(e);
            res.status(500).send({ "error": e })
        }
    }

    async getDocument(req: Request, res: Response){
        try {
            const docId = req.params.id
            const result = await aiService.get(docId)
            console.log(result);
            res.status(200).send(result)
        } catch (e) {
            console.log(e);
            res.status(500).send({ "error": e })
        }
    }

    async getAllDocuments(req: Request, res: Response) {
        try {
            const result = await aiService.getAll()
            console.log(result);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(500).send({ "error": e })
        }
    }

    async updateDocument(req: Request, res: Response){
        try {
            const docId = req.params.id
            const requestData = req.body as ComposerDocument;
            const result = await aiService.update(docId, requestData)
            console.log(result);
            res.status(200).send(result)
        } catch (e) {
            console.log(e);
            res.status(500).send({ "error": e })
        }
    }

    async refreshOutline(req: Request, res: Response){
        try {
            const docId = req.params.id
            const requestData = req.body as ComposerDocument;
            const updatedDocument = await aiService.generateOutline(requestData)
            const result = await aiService.updateOutline(docId, requestData)
            console.log(result);
            res.status(200).send(result)
        } catch (e) {
            console.log(e);
            res.status(500).send({ "error": e })
        }
    }

    async processRequest(req: Request, res: Response){
        const requestData = req.body.prompt
        const result = await aiService.process(requestData)
        res.status(201).send({ "result": result })
    }
}

export default new AiController();