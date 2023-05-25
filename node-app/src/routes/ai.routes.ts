import { Router } from "express";
import controller from "../controllers/ai.controller";
import { createValidator } from 'express-joi-validation'
import {getPointsValidator, processReceiptValidator} from "../validators/receipts.validators";

export const aiRoutes = Router();
const validator = createValidator()

// If we needed some access control, it would get declared here as middleware
aiRoutes.post("/", controller.processRequest);

aiRoutes.post("/receipts", validator.body(processReceiptValidator), controller.processReceipt);