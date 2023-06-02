import { Router } from "express";
import controller from "../controllers/ai.controller";
import { createValidator } from 'express-joi-validation'

export const aiRoutes = Router();
const validator = createValidator()

// If we needed some access control, it would get declared here as middleware
aiRoutes.post("/process", controller.processRequest);
aiRoutes.post("/", controller.createNewDocument);
