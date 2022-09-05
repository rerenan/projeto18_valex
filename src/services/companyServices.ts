import { notFoundError } from "../handlers/errorHandler";
import { findByApiKey } from "../repositories/companyRepository"

export async function findCompanyByApiKey(apiKey: string | string[]):Promise<Object>{
    const company = await findByApiKey(apiKey);
    
    if(!company) throw notFoundError("company");

    return company;
}