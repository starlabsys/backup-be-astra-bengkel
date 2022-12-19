import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import ResponseResult from "../../core/response/ResponseResult";
import { EnumResponseCode } from "../../utils/enum/EnumResponseCode";


export const validatorRegister = [
    check( 'action' ).isNumeric().notEmpty(),
    check( 'id' ).isNumeric().notEmpty(),
    check( 'kodeJasa' ).isString().notEmpty(),
    check( 'namaJasa' ).isString().notEmpty(),
    check( 'groupJasa' ).isString().notEmpty(),
    check( 'harga' ).isNumeric().notEmpty(),
    check( 'pajak' ).isNumeric().notEmpty(),
    check( 'oumKerja' ).isNumeric().notEmpty(),
    check( 'tipeKomisi' ).isNumeric().notEmpty(),
    check( 'satuanKomisi' ).isNumeric().notEmpty(),
    check( 'nilaiKomisi' ).isNumeric().notEmpty(),
    check( 'status' ).isBoolean().notEmpty(),
    check( 'waktuPengerjaan' ).isNumeric().notEmpty(),
    check( 'listSparepart' ).isArray(),
    check( 'kategoriPekerjaan' ).isNumeric().notEmpty(),

    ( req : Request, res : Response, next : NextFunction ) => {
        const error = validationResult( req );

        if ( !error.isEmpty() ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : '01',
                message : "Invalid Request",
                data : error.array( { onlyFirstError : true } )
            } )
        }
        next();
    }
]
