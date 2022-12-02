import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
const db = require("../db/models");

const validate = [
    check("no_polisi", "Please enter a License Plate").isLength({ min: 6 }),
    check("no_rangka", "Please enter a Chassis Number").isLength({ min: 6 }),
    check("kode_tipe_unit", "Please enter a Code Type Unit").isLength({min:1}),
    check("tahun_motor", "Please enter a Year Motor").isNumeric().isLength({min:1}),
    check("informasi_bensin", "Please enter a Fuel Information").isNumeric().isLength({min:1}),
    check("km_terakhir", "Please enter a Last KM").isNumeric().isLength({min:1}),
    check("tipe_coming_customer", "Please enter a Type Coming Customer").isLength({min:1}),
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