import { Request, Response } from "express";
import { rechargeCard } from "../services/rechargeServices";

export async function recharge(req:Request, res: Response) {
    const {cardId, amount} = req.body;
    const recharge = rechargeCard(cardId, amount);

    res.sendStatus(200);
}