import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";


export const jasaPutValidator = [
    check( 'action' ).isNumeric().notEmpty(),
    check( 'id' ).isNumeric().notEmpty(),
    check( 'kodeJasa' ).isString().notEmpty(),
    check( 'namaJasa' ).isString().notEmpty(),
    check( 'grupJasa' ).isString(),
    check( 'subGrup' ).isString().notEmpty(),
    check( 'hargaJual' ).isNumeric().notEmpty(),
    check( 'pajakJual' ).isNumeric().notEmpty(),
    check( 'catatan' ).isString(),
    check( 'oumKerja' ).isNumeric().notEmpty(),
    check( 'tipeKomisi' ).isNumeric().notEmpty(),
    check( 'satuanKomisi' ).isString().notEmpty(),
    check( 'nilaiKomisi' ).isNumeric().notEmpty(),
    check( 'aktif' ).isBoolean().notEmpty(),
    check( 'waktuKerja' ).isNumeric().notEmpty(),
    check( 'listSparePart' ).isArray(),
    check( 'kategoriPekerjaanID' ).isNumeric().notEmpty(),

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
