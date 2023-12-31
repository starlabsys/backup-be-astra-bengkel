import { Request, Response } from 'express';
import { EnumResponseCode } from '../../../utils/enum/EnumResponseCode';
import ResponseResult from "../../../core/response/ResponseResult";
import Token from "../../../utils/Token";
import LaporanRepository from '../../../domain/repository/LaporanRepository/LaporanRepository';
import { InterfaceGetLaporan } from '../../../domain/repository/LaporanRepository/interface/InterfaceGetLaporan';
import { InterfaceGetLaporanPKB } from '../../../domain/repository/LaporanRepository/interface/InterfaceGetLaporanPKB';


class LaporanController {

    public getLaporan = async ( req : Request, res : Response ) => {
        try {
            const token = await Token.get( req, res );
            const data : InterfaceGetLaporan = req.body;
            const resp = await LaporanRepository.getData( res, token ?? '', data );

            // console.log(resp.)
            if ( resp !== null ) {
                return res.status( 200 ).json( {
                    errorCode : "00",
                    status : true,
                    message : "Success",
                    data : resp
                } )
                // return ResponseResult.successGet( res, Buffer.from(resp).toString('base64') );
            }
        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.INTERNAL_SERVER_ERROR,
                errorCode : '01',
                message : e.message,
                data : null
            })
        }
    }

    public getPkbData = async ( req : Request, res : Response ) => {
        try {
            const token = await Token.get( req, res );
            const data : InterfaceGetLaporanPKB = req.body;
            const resp = await LaporanRepository.getPkb( res, token ?? '', data );

            // console.log(resp.)

            if ( resp !== null ) {

                res.setHeader(
                    "Content-Disposition",
                    'attachment; filename=2ad020af-350b-4a94-97eb-ad2ed6fb8301-ReportNotaServices_14012023_14012023.xls'
                );
                res.setHeader( "Content-Type", "application/vnd.ms-excel" );
                // return res.status( 200 ).json( {
                //     errorCode : "00",
                //     status : true,
                //     message : "Success",
                //     data : Buffer.from( resp ).toString( 'base64' )
                // } )
                return ResponseResult.successGet( res, {
                    data : resp
                } );
            }
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : 'Data not found',
                data : null
            } )
        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.INTERNAL_SERVER_ERROR,
                errorCode : '01',
                message : e.message,
                data : null
            } )
        }
    }
}

export default new LaporanController();
