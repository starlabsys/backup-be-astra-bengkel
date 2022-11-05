import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
const db = require("../db/models");

const validate = [
    check("parts_code", "Please enter a parts code").isLength({ min: 3 }),
    check("parts_name", "Please enter a Parts Name").isLength({ min: 3 }),
    check("parts_qty", "Please enter a Parts Qty").isNumeric().isLength({min:1}),
    check("parts_price", "Please enter a Parts Price").isNumeric().isLength({min:1}),
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