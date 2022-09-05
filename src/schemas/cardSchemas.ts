import joi from "joi";

const createCardSchema = joi.object({
    employeeId: joi.number().required(),
    type: joi.string().pattern(/^groceries$|^restaurants$|^transport$|^education$|^health$/),
});

const activateCardSchema = joi.object({
    cardId: joi.number().min(1).required(),
    cvcNumber: joi.string().length(3).required(),
    password: joi.string().min(4).pattern(/^[0-9]+$/).required(),
})
export {
    createCardSchema,
    activateCardSchema
};