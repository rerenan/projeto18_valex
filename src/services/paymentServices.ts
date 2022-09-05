import { notFoundError } from "../handlers/errorHandler";
import * as businessRepository from "../repositories/businessRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import { Card } from "../repositories/cardRepository";
import {Business} from "../repositories/businessRepository";
import * as cardServices from "./cardServices";

export async function payment(cardId: number, password: string, businessId: number, amount: number){
    
    const card = await cardServices.findCardById(cardId);
    
    cardServices.validateCard(card, true, true , true);

    cardServices.validatePassword(password, card.password || "");

    const business = await findBusinessById(businessId);

    validateBusiness(card, business);

    validateAmountInCard(cardId, amount);

    const paymentData = {
        cardId,
        businessId,
        amount
    }

    await paymentRepository.insert(paymentData);

    return;
}

async function findBusinessById(businessId: number){
    const business = await businessRepository.findById(businessId);
    if(!business) throw notFoundError("business");
    return business;
}

function validateBusiness(card: Card, business: Business){
    if(card.type !== business.type) throw {type: "forbidden", message:"Card not accepted into this business"}
}

async function validateAmountInCard(cardId: number, amount: number) {
    const payments = await paymentRepository.getPaymentTotal(cardId);
    const recharges = await rechargeRepository.getRechargeTotal(cardId);
    
    const balance = recharges - payments;
    if(amount > balance) throw {type: "notAcceptable", message: "balance insufficient"}
};