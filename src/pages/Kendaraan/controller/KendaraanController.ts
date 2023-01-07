import { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import KendaraanRepository from "../../../domain/repository/Kendaraan/KendaraanRepository";
import Token from "../../../utils/Token";
import { InterfaceGetKendaraan } from "../../../domain/repository/Kendaraan/interface/InterfaceGetKendaraan";
import { InterfaceGetPelanggan } from "../../../domain/repository/Kendaraan/interface/InterfaceGetPelanggan";
import { InterfaceAddKendaraan } from "../../../domain/repository/Kendaraan/interface/InterfaceAddKendaraan";
import { InterfaceDetailKendaraan } from "../../../domain/repository/Kendaraan/interface/InterfaceDetailKendaraan";
import { InterfaceEditKendaraan } from "../../../domain/repository/Kendaraan/interface/InterfaceEditKendaraan";


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

    public detailKendaraan = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceDetailKendaraan = req.body
        try {
            const token = await Token.get( req, res );
            const resp = await KendaraanRepository.detailKendaraan( res, token ?? '', data );

            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp );
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.NOT_FOUND,
                errorCode : '01',
                message : 'Data not found',
                data : null
            } )
        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : e.message,
                data : null
            } )
        }
    }

    public editKendaraan = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceEditKendaraan = req.body
        try {
            const token = await Token.get( req, res );
            const resp = await KendaraanRepository.updatedKendaraan( res, token ?? '', data );
            if ( resp !== null ) {
                return ResponseResult.successPost( res, resp.message );
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

    public addKendaraan = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceAddKendaraan = req.body
        try {
            const token = await Token.get( req, res );
            const resp = await KendaraanRepository.addKendaraan( res, token ?? '', data );
            if ( resp !== null ) {
                return ResponseResult.successPost( res, resp.message );
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

    public getKendaraanServices = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceGetKendaraanServices = req.body
        try {
            const token = await Token.get( req, res );

            const resp = await KendaraanRepository.getKendaraanService( res, token ?? '', data );
            
            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp );
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.NOT_FOUND,
                errorCode : '01',
                message : 'Data not found',
                data : null
            } )
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
