import {Request, Response} from "express";
import aiService from "../services/ai.service"
import { ComposerDocument } from "common/src/types/ComposerDocument";

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

    async processRequest(req: Request, res: Response){
        const requestData = req.body.prompt
        const result = await aiService.process(requestData)
        res.status(201).send({ "result": result })
    }
}

export default new AiController();