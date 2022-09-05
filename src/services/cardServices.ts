import {faker} from "@faker-js/faker";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import * as cardRepository from "../repositories/cardRepository";
import { TransactionTypes } from "../repositories/cardRepository";
import { CardInsertData } from './../repositories/cardRepository';
import { insert } from "../repositories/cardRepository";
import { Employee } from './../repositories/employeeRepository';
import { notFoundError } from "../handlers/errorHandler";

dotenv.config();

const secretKey = process.env.CRYPTR_KEY || "";
const cryptr = new Cryptr(secretKey);

const date = new Date();
const currentYear = date.getFullYear();
const currentMounth = date.getMonth();

export async function createNewCard(employee: Employee, type: TransactionTypes) {
    
    const confictTypes = await cardRepository.findByTypeAndEmployeeId(type, employee.id);
    if(confictTypes) throw {type: "conflict", message: "The employee already has a card of that type "};

    const name = formatName(employee.fullName);
    const expirationDate = formatDate();
    const cardNumber = faker.finance.creditCardNumber();
    const cvcNumber = faker.finance.creditCardCVV();
    const encryptedCvcNumber = cryptr.encrypt(cvcNumber);

    const cardData: CardInsertData = {
        employeeId: employee.id,
        number: cardNumber,
        cardholderName: name,
        securityCode: encryptedCvcNumber,
        expirationDate,
        isVirtual: false,
        isBlocked: true,
        type,
    };

    await insert(cardData);

    return {...cardData, securityCode: cvcNumber};
};

export async function activateCard(cardId:number, cvcNumber: string, password: string) {
    
    const card = await findCardById(cardId);
    validateCard(card, true, true, false);

    if(!card.isBlocked) throw {type: "conflict", message:"The card is already activated"};

    const descryptedCvcNumber = cryptr.decrypt(card.securityCode);
    if(cvcNumber !== descryptedCvcNumber) throw {type: "unathorized", message: "Credentials don't match"};

    const passwordHash = bcrypt.hashSync(password, 10);

    const cardData = {
        password: passwordHash,
        isBlocked: false
    };

    await cardRepository.update(cardId, cardData);
    return true;

};

export async function blockCard(cardId:number, password: string) {
    const card = await findCardById(cardId);
    validateCard(card, false, true, true);
    
    const validatePassword = bcrypt.compareSync(password, card.password || "");
    if(!validatePassword) throw {type: "unauthorized", message: "Password is wrong"};
    const uptadeData = {
        isBlocked: true
    }
    
    await cardRepository.update(cardId,uptadeData);
    return;
}

export async function findCardById(id: number){
    const card = await cardRepository.findById(id);
    if(!card) throw notFoundError("card");
    return card;
};

export async function validateCard(card: cardRepository.Card, notActive: boolean, notExpired: boolean, notBlocked: boolean){
    if(notActive){
        if(card.password) throw {type: "conflict", message:"The card already is activated"}
    }
    if(notExpired){
        const isExpired = compareDate(card.expirationDate);
        if(isExpired) throw {type:"preconditionFailed", message: "The card has expired"};
    }
    
    if(notBlocked){
        if(card.isBlocked) throw {type: "conflict", message:"The card is blocked"};
    }
   
}

function formatName(name: string){
    const nameArray = name.split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray[nameArray.length-1];
    const middleNames = nameArray;
    middleNames.pop();
    middleNames.shift();
    const abbreviateDMiddleNames = middleNames.map((name: string)=> name[0].toUpperCase());
    return firstName + " " + abbreviateDMiddleNames.join(" ") + " " +lastName;
};

function formatDate() {
    return `${currentMounth}/${currentYear-2000 + 5}`;
};

function compareDate(compareDate: string){
    const length = compareDate.length;
    const expirationYear = Number(compareDate[length-2] + compareDate[length-1]);
    const expirationMounth = Number((compareDate[0] + compareDate[1]).replace("/",""));

    if(expirationYear < currentYear ) return false;
    if(expirationMounth < currentMounth) return false;
    return true;
}