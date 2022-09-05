import {Request, Response } from "express"
import { createNewCard } from "../services/cardServices";
import { findEmployeeById } from "../services/employeeServices";

export async function createCard(req:Request, res:Response) {
    const {employeeId, type} = req.body;

    const employee = await findEmployeeById(employeeId);

    const card = await createNewCard(employee, type);

    res.status(201).send(card);
};
    
