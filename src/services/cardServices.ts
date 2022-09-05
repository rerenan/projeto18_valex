import {faker} from "@faker-js/faker";
import Cryptr from "cryptr";
import dotenv from "dotenv";

import { findByTypeAndEmployeeId, TransactionTypes } from "../repositories/cardRepository";
import { CardInsertData } from './../repositories/cardRepository';
import { insert } from "../repositories/cardRepository";
import { Employee } from './../repositories/employeeRepository';

dotenv.config();

const secretKey = process.env.CRYPTR_KEY || "";
const cryptr = new Cryptr(secretKey);

export async function createNewCard(employee: Employee, type: TransactionTypes) {
    
    const confictTypes = await findByTypeAndEmployeeId(type, employee.id);
    if(confictTypes) throw {type: "conflict", message: "The employee already has a card of that type "};

    const name = formatName(employee.fullName);
    const expirationDate = formatDate();
    const cardNumber = faker.finance.creditCardNumber();
    const cvvNumber = faker.finance.creditCardCVV();
    const encryptedcvvNumber = cryptr.encrypt(cvvNumber);

    const cardData: CardInsertData = {
        employeeId: employee.id,
        number: cardNumber,
        cardholderName: name,
        securityCode: encryptedcvvNumber,
        expirationDate,
        isVirtual: false,
        isBlocked: true,
        type,
    };

    await insert(cardData);

    return cardData;
};

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
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMounth = date.getMonth();

    return `${currentMounth}/${currentYear-2000 + 5}`;

};