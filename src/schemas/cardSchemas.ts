import joi from "joi";

const createCardSchema = joi.object({
    employeeId: joi.number().required(),
    type: joi.string().pattern(/^groceries$|^restaurants$|^transport$|^education$|^health$/),
});

export {
    createCardSchema
};