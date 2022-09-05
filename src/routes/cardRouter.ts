import { Router } from "express";

import { activateCard, blockCard, createCard, unblockCard } from "../controllers/cardController";
import apiKeyValidator from "../middlewares/apiKeyValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { activateCardSchema, blockCardSchema, createCardSchema } from "../schemas/cardSchemas";

const cardRouter = Router();

cardRouter.post("/create", apiKeyValidator, schemaValidator(createCardSchema), createCard);
cardRouter.put("/active", schemaValidator(activateCardSchema), activateCard);
cardRouter.put("/block", schemaValidator(blockCardSchema), blockCard);
cardRouter.put("/unblock", schemaValidator(blockCardSchema), unblockCard);

export default cardRouter;