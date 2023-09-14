import { Router } from "express";
import controller from "../controllers/ai.controller.js";
import { createValidator } from 'express-joi-validation'

export const aiRoutes = Router();
const validator = createValidator()

// If we needed some access control, it would get declared here as middleware
aiRoutes.post("/process", controller.processRequest);
aiRoutes.post("/", controller.createNewDocument);
aiRoutes.get("/", controller.getAllDocuments);
aiRoutes.get("/:id", controller.getDocument);
aiRoutes.put("/:id", controller.updateDocument);
aiRoutes.post("/:id/outline", controller.refreshOutline);

// another set of routes for the sections

// aiRoutes.post("/:id/:sectionId", controller.createNewSection); // take in some user provided metadata about the section