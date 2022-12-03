import { Request, Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if(!req.headers.authorization){
        return res.status(403).json({
            status: false,
            message: "Unauthorized",
        });
    }

    let secretKey = process.env.SECRET_KEY || 'secretKey';
    const token: string = req.headers.authorization.split(" ")[1];

    try{
        const credential : string | object = jwt.verify(token, secretKey);

        if(credential){
            req.app.locals.credential = credential;
            return next();
        }

        return res.status(403).json({
            status: false,
            message: 'Invalid token'
        })
    }catch(err){
        return res.status(403).json({
            status: false,
            message: err
        });
    }
}