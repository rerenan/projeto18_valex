import { Request, Response, NextFunction } from "express";
import { findCompanyByApiKey } from "../services/companyServices";

export default async function apiKeyValidator(req: Request, res: Response, next: NextFunction){
    const {x_api_key} = req.headers;

    if(!x_api_key) throw {type: "unathorized", message: "API key not found"};

    const company = findCompanyByApiKey(x_api_key);
    res.locals.company = company;
    next();
};