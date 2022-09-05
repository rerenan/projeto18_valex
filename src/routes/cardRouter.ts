import { Router } from "express";

import { activateCard, createCard } from "../controllers/cardController";
import apiKeyValidator from "../middlewares/apiKeyValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { activateCardSchema, createCardSchema } from "../schemas/cardSchemas";

const cardRouter = Router();

cardRouter.post("/create", apiKeyValidator, schemaValidator(createCardSchema), createCard);
cardRouter.post("/active", schemaValidator(activateCardSchema), activateCard);

export default cardRouter;