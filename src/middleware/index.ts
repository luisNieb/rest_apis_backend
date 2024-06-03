import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator";

export const handleInputErrors=(req:Request, res:Response, next:NextFunction) => {
    /// next();  envia a la siguient funcion
    let error= validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }
     next();

}