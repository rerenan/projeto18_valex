import { Router } from "express";
import { recharge } from "../controllers/transactionsController";
import apiKeyValidator from "../middlewares/apiKeyValidator";
import schemaValidator from "../middlewares/schemaValidator";
import { rechargeSchema } from "../schemas/transactionsSchemas";

const transactionsRouter = Router();

transactionsRouter.post("/recharge", schemaValidator(rechargeSchema), apiKeyValidator, recharge);
transactionsRouter.post("/payment", );

export default transactionsRouter;