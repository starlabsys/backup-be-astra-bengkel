import e, { Request, Response, NextFunction } from "express";
import { check, param, validationResult } from "express-validator";


const db = require( "../db/modelsx" );

const validate = [
    check( "service_code", "Please enter a Service Code" ).optional( { nullable : true } ),
    check( "service_name", "Please enter a Service Name" ).optional( { nullable : true } ),
    check( "group", "Please enter a Group" ).optional( { nullable : true } ),
    check( "sub_group", "Please enter a Sub Group" ).optional( { nullable : true } ),
    check( "category_work", "Please enter a Category Work" ).optional( { nullable : true } ),
    check( "service_price", "Please enter a Service Price" ).optional( { nullable : true } ).isNumeric(),
    check( "time_service", "Please enter a Time Service" ).optional( { nullable : true } ),
    check( "time_range", "Please enter a Range Time" ).optional( { nullable : true } ),
    check( "service_note", "Please enter a Note Service" ).optional( { nullable : true } ),
    check( "commision_type", "Please enter a Commission Type" ).optional( { nullable : true } ),
    check( "commision_percentage", "Please enter a Percentage Commission" ).optional( { nullable : true } ),
    check( "commision_unit", "Please enter a Unit Commission" ).optional( { nullable : true } ),
    check( "parts", "Please enter a Parts" ).optional( { nullable : true } ),
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
