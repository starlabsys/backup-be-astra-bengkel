import { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";
import TipeKendaraanRepository from "../../../domain/repository/TipeKendaraanRepository/TipeKendaraanRepository";
import {
    InterfaceGetTipeKendaraan
} from "../../../domain/repository/TipeKendaraanRepository/interface/InterfaceGetKendaraan";


class TipeKendaraanController {
    public getData = async ( req : Request, res : Response ) => {
        const data : InterfaceGetTipeKendaraan = req.body;
        try {
            const token = await Token.get( req, res );
            const resp = await TipeKendaraanRepository.getData( res, token ?? '', data )
            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp )
            }
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : "01",
                message : "Internal Error",
                data : null
            } )
        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                message : e.message,
                data : null
            } )
        }
    }
}

export default new TipeKendaraanController()
