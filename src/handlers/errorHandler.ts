import { Request, Response, NextFunction } from 'express';

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction){

    console.log(error.message);
    console.log(error);
    
   return res.sendStatus(500);
};

export function notFoundError(entity: string){
    return {
		type: "error_not_found",
		message: `Could not find specified "${entity}"!`
	};
};