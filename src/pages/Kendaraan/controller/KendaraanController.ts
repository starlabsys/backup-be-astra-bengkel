import { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import KendaraanRepository from "../../../domain/repository/Kendaraan/KendaraanRepository";
import Token from "../../../utils/Token";
import { InterfaceGetKendaraan } from "../../../domain/repository/Kendaraan/interface/InterfaceGetKendaraan";
import { InterfaceGetPelanggan } from "../../../domain/repository/Kendaraan/interface/InterfaceGetPelanggan";


class KendaraanController {
    public get = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceGetKendaraan = req.body
        try {
            const token = await Token.get( req, res );
            const resp = await KendaraanRepository.get( res, token ?? '', data );
            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp );
            }
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.NOT_FOUND,
                errorCode : '01',
                message : 'Data not found',
                data : null
            } );
        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : e.message,
                data : null
            } )
        }
    }

    public getPelanggan = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceGetPelanggan = req.body
        try {
            const token = await Token.get( req, res );
            const resp = await KendaraanRepository.getPelanggan( res, token ?? '', data );
            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp );
            }
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.NOT_FOUND,
                errorCode : '01',
                message : 'Data not found',
                data : null
            } );
        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : e.message,
                data : null
            } )
        }
    }
}

export default new KendaraanController();
