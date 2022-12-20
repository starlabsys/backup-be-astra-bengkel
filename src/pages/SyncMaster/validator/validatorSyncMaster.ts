import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";


export const validateSyncMaster = [
    check( "listDropDown", "Data tidak valid" ).isArray(),
    ( req : Request, res : Response, next : NextFunction ) => {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : '01',
                message : errors.array()[ 0 ].msg,
                data : null
            } )
        }
        next();
    }
]
