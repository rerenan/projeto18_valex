import * as rechageRepository from "../repositories/rechargeRepository"
import { findCardById, validateCard } from "./cardServices";

export async function rechargeCard(cardId:number, amount: number) {
  
    const card = await findCardById(cardId);
    validateCard(card, true, true, true);
    const rechargeData = {
        cardId,
        amount,
    }
    await rechageRepository.insert(rechargeData);
    return;
}