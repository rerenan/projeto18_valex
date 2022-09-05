import {Request, Response } from "express"
import * as cardServices from "../services/cardServices";
import { findEmployeeById } from "../services/employeeServices";

export async function createCard(req:Request, res:Response) {
    const {employeeId, type} = req.body;

    const employee = await findEmployeeById(employeeId);

    const card = await cardServices.createNewCard(employee, type);

    res.status(201).send(card);
};

export async function activateCard(req: Request, res: Response) {
    const {cardId, cvcNumber, password} = req.body;
    await cardServices.activateCard(cardId, cvcNumber, password);

    res.status(200).send("activated");
}
