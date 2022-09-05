import joi from "joi";

const rechargeSchema = joi.object({
    cardId: joi.number().required(),
    amount: joi.number().greater(0).required()
});

const purchaseSchema = joi.object({
    cardId: joi.number().required(),
    password: joi.string().min(4).pattern(/^[0-9]+$/).required(),
    buisinessId: joi.number().required(),
    amount: joi.number().greater(0).required()
});

export {
    rechargeSchema,
    purchaseSchema
};