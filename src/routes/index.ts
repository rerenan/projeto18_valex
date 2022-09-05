import {Router} from "express";

import cardRouter from "./cardRouter";
import transactionsRouter from "./transactionsRouter";

const router = Router();

router.use("/card",cardRouter);
router.use("/transactions", transactionsRouter);

export default router;