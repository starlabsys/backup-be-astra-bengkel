import ResponseResult from "../../../core/response/ResponseResult";
import { Request, Response } from "express";
import SparepartRepository from "../../../domain/repository/SparepartRepository/SparepartRepository";
import Token from "../../../utils/Token";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";


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
                "action" : action,
                "namaSparepart" : namaSparepart,
                "kodeSparepart" : kodeSparepart,
                "pageNumber" : pageNumber,
                "pageSize" : pageSize,
                "totalRow" : totalRow,
                "sortColumn" : sortColumn,
                "sortDirection" : sortDirection
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
}

export default new SparepartController();
