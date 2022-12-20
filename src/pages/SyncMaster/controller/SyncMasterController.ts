import { Request, Response } from "express";
import Token from "../../../utils/Token";
import MasterDropDownRepository from "../../../domain/repository/MasterData/DropDown/MasterDropDownRepository";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";


class SyncMasterController {
    public dropDown = async ( req : Request, res : Response ) : Promise<Response> => {
        const { listDropDown } = req.body;
        try {
            const token = await Token.get( req, res );
            const resp = await MasterDropDownRepository.syncMaster( res, token ?? '', {
                lastSyncList : [
                    ...listDropDown
                ]
            } )
            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp )
            }
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : '01',
                message : 'Failed get data',
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
        // {
        //     "lastSyncList" : [
        //     {
        //         "lastSyncTime" : "1900-01-01 00:00:00",
        //         "objectName" : "satuanKomisi"
        //     },
        //     {
        //         "lastSyncTime" : "1900-01-01 00:00:00",
        //         "objectName" : "RefUOM"
        //     },
        //     {
        //         "lastSyncTime" : "1900-01-01 00:00:00",
        //         "objectName" : "KategoriPekerjaan"
        //     }
        // ]
        // }
    }

    public groupDropDown = async ( req : Request, res : Response ) : Promise<Response> => {
        try {
            const token = await Token.get( req, res );
            const resp = await MasterDropDownRepository.masterDropDown( res, token ?? '', {
                listDropDown : [
                    {
                        tipe : 1,
                        nilai : "1"
                    }
                ]
            } )
            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp )
            }
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : '01',
                message : 'Failed get data',
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

export default new SyncMasterController();
