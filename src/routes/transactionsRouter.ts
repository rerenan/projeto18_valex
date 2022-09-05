import { Router } from "express";
import { purchase, recharge } from "../controllers/transactionsController";
import apiKeyValidator from "../middlewares/apiKeyValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { purchaseSchema, rechargeSchema } from "../schemas/transactionsSchemas";

const transactionsRouter = Router();

transactionsRouter.post("/recharge", schemaValidator(rechargeSchema), apiKeyValidator, recharge);
transactionsRouter.post("/payment", schemaValidator(purchaseSchema), purchase);

export default transactionsRouter;