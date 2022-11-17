import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
const db = require("../db/models");

const validate = [
    check("user_id", "Please enter a user id").isNumeric().isLength({ min: 1 }),
    check("dealer_number", "Please enter a Dealer Number").isNumeric().isLength({ min: 3 }),
    check("dealer_name", "Please enter a Dealer Name").isLength({min:1}),
    check("address", "Please enter a Dealer Address").isLength({min:1}),
    check("data_1", "Please enter a Fuel Information").optional({ nullable:true }).isLength({min:1}),
    check("data_2", "Please enter a Fuel Information").optional({ nullable:true }).isLength({min:1}),
    check("data_3", "Please enter a Fuel Information").optional({ nullable:true }).isLength({min:1}),
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