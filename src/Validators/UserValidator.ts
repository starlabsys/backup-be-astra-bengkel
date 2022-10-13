import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
const db = require("../db/models");

const validate = [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
    check('roles', 'Please enter a valid role').isIn(['Admin', 'Owner', 'Cashier']),
    check('owner_name', 'Please enter a valid owner name').isLength({ min: 3 }),
    check('owner_address', 'Please enter a valid owner address').isLength({ min: 3 }),
    check('owner_phone', 'Please enter a valid owner phone').isLength({ min: 3 }),
    check('owner_identity', 'Please enter a valid owner identity').isNumeric().isLength({ min: 3 }),
    check('path_image',).isString(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
]

export default validate;