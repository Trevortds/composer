import { Router } from "express";
import * as controller from "../controllers/index.controller.js";

export const indexRoutes = Router();

indexRoutes.get("/", controller.indexController);
