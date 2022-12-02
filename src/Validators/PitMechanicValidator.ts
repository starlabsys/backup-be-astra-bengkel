import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
const db = require("../db/models");

const validate = [
    check("pit_id", "Please enter a Kode Pit").isNumeric().isLength({ min: 1 }),
    check("mechanic_id", "Please enter a Tipe Pit").isNumeric().isLength({ min: 1 }),
    check("is_active", "Please choose a Status").isBoolean(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ 
                status: false,
                result: [{
                    key: errors.array()[0].param,
                    message: errors.array()[0].msg,
                }]
            });
        }
        next();
    }
]

export default validate;