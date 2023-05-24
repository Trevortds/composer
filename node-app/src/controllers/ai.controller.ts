import {Request, Response} from "express";
import aiService from "../services/ai.service"

class AiController {


    processRequest(req: Request, res: Response){
        const requestData = req.body
        const id = aiService.process(requestData)
        res.status(201).send({ "id": id })
    }
}

export default new AiController();