import { Request, Response } from "express";
import { payment } from "../services/paymentServices";
import { rechargeCard } from "../services/rechargeServices";

export async function recharge(req:Request, res: Response) {
    const {cardId, amount} = req.body;
    const recharge = await rechargeCard(cardId, amount);

    res.sendStatus(200);
}

export async function purchase(req:Request, res: Response) {
    const {cardId, password, buisinessId, amount} = req.body;
    const purchase = await payment(cardId, password, buisinessId, amount);

    res.sendStatus(200);
}