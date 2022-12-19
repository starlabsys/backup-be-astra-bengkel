import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";


const db = require( "../db/modelsx" );

const validate = [
    check( "workshop_id", "Please enter a Workshop id" ).isNumeric().isLength( { min : 1 } ),
    check( "mechanic_name", "Please enter a Mechanic Name" ).isLength( { min : 3 } ),
    check( "mechanic_number", "Please enter a Mechanic Number" ).isLength( { min : 1 } ),
    check( "mechanic_gender", "Please enter a Mechanic Gender" ).isIn( [ 'Male', 'Female' ] ).isLength( { min : 1 } ),
    check( "mechanic_phone", "Please enter a Mechanic Phone" ).optional( { nullable : true } ).isLength( { min : 1 } ),
    check( "mechanic_address", "Please enter Mechanic Address" ).optional( { nullable : true } ).isLength( { min : 1 } ),
    ( req : Request, res : Response, next : NextFunction ) => {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.status( 401 ).json( {
                status : false,
                result : [ {
                    key : errors.array()[ 0 ].param,
                    message : errors.array()[ 0 ].msg,
                } ]
            } );
        }
        next();
    }
]

export default validate;
