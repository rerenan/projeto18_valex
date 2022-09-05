import { Router } from "express";

import { createCard } from "../controllers/cardController";
import apiKeyValidator from "../middlewares/apiKeyValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { createCardSchema } from "../schemas/cardSchemas";

const cardRouter = Router();

cardRouter.post("/create", apiKeyValidator, schemaValidator(createCardSchema), createCard);

export default cardRouter;