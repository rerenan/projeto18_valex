import { NextFunction, Request, Response } from "express";
import {ObjectSchema} from "joi"

export default function schemaValidator(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) throw {type: "unprocessableEntity", message: error.message};

        next();
    };
};
