import ResponseResult from "../../../core/response/ResponseResult";
import { Request, Response } from "express";
import SparepartRepository from "../../../domain/repository/SparepartRepository/SparepartRepository";
import Token from "../../../utils/Token";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import {
    InterfaceGetDetailSparepart
} from "../../../domain/repository/SparepartRepository/interface/InterfaceGetDetailSparepart";
import { InterfaceAddSparepart } from "../../../domain/repository/SparepartRepository/interface/interfaceAddSparepart";


class SparepartController {
    public getSparepart = async ( req : Request, res : Response ) : Promise<Response> => {

        const {
            action,
            namaSparepart,
            kodeSparepart,
            pageNumber,
            pageSize,
            totalRow,
            sortColumn,
            sortDirection
        } = req.body;

        try {
            const token = await Token.get( req, res );

            const resp = await SparepartRepository.getData( res, token ?? '', {
                action : action,
                namaSparepart : namaSparepart,
                kodeSparepart : kodeSparepart,
                pageNumber : pageNumber,
                pageSize : pageSize,
                totalRow : totalRow,
                sortColumn : sortColumn,
                sortDirection : sortDirection
            } );

            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp );
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.INTERNAL_SERVER_ERROR,
                errorCode : '01',
                message : "Internal Error",
                data : null
            } )

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : 400,
                errorCode : '01',
                message : e.message,
                data : e
            } )
        }
    }

    public addSparepart = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceAddSparepart = req.body;

        try {
            const token = await Token.get( req, res );
            const resp = await SparepartRepository.addSparepart( res, token ?? '', data )
            // console.log(token)

            if ( resp !== null ) {
                if ( resp.ack === 1 ) {
                    return ResponseResult.successPost( res, resp.message );
                }
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : '01',
                    message : resp.message,
                    data : null
                } )
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.INTERNAL_SERVER_ERROR,
                errorCode : '01',
                message : "Internal Error",
                data : null
            } )

        } catch ( e : any ) {
            console.log( "Error Sparepart" )
            return ResponseResult.error( res, {
                statusCode : 400,
                errorCode : '01',
                message : e.message,
                data : e
            } )
        }
    }

    public detailSparepart = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceGetDetailSparepart = req.body;
        const token = await Token.get( req, res );

        try {
            const resp = await SparepartRepository.getDetailSparepart( res, token ?? '', data );
            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp );
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.INTERNAL_SERVER_ERROR,
                errorCode : '01',
                message : "Internal Error",
                data : null
            } )
        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : 400,
                errorCode : '01',
                message : e.message,
                data : e
            } )
        }

    }
}

export default new SparepartController();
