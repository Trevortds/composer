import {Request, Response} from "express";
import aiService from "../services/ai.service"

class AiController {


    async processRequest(req: Request, res: Response){
        const requestData = req.body.prompt
        const result = await aiService.process(requestData)
        res.status(201).send({ "result": result })
    }
}

export default new AiController();