import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
const db = require("../db/models");

const validate = [
    check("kode_pit", "Please enter a Kode Pit").isLength({ min: 3 }),
    check("tipe_pit", "Please enter a Tipe Pit").isLength({ min: 3 }),
    check("is_active", "Please choose a Status").isBoolean(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ 
                status: false,
                message: errors.array()
            });
        }
        next();
    }
]

export default validate;