import { Request, Response } from "express";
import Token from "../../../utils/Token";
import MasterDropDownRepository from "../../../domain/repository/MasterData/DropDown/MasterDropDownRepository";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import AreaRepository from "../../../domain/repository/MasterData/Area/AreaRepository";
import {
    InterfaceGetListAreaKalBar
} from "../../../domain/repository/MasterData/Area/interface/InterfaceGetListAreaKalBar";
import {
    InterfaceListIDTraining
} from "../../../domain/repository/MasterData/DropDown/interface/InterfaceTrainingList";
import CekKodeRepository from "../../../domain/repository/MasterData/CekKode/CekKodeRepository";
import { InterfaceCekKode } from "../../../domain/repository/MasterData/CekKode/interface/InterfaceCekKode";
import { InterfaceGetGudang } from "../../../domain/repository/MasterData/gudang/interface/InterfaceGetGudang";
import GudangRepository from "../../../domain/repository/MasterData/gudang/GudangRepository";


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
        const { listGroupDropDown } = req.body;
        try {
            const token = await Token.get( req, res );
            const resp = await MasterDropDownRepository.masterDropDown( res, token ?? '', {
                listDropDown : [
                    ...listGroupDropDown,
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

    public listArea = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceGetListAreaKalBar = req.body;
        try {
            const token = await Token.get( req, res );
            const resp = await AreaRepository.getListAreaKalBar( res, token ?? '', data )
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

    public training = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceListIDTraining[] = req.body;
        try {

            const token = await Token.get( req, res );
            const resp = await MasterDropDownRepository.trainingLevel( res, token ?? '', {
                listJabatan : [
                    ...data
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

    public cekKode = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceCekKode = req.body;
        try {
            const token = await Token.get( req, res );

            const resp = await CekKodeRepository.cekKode( res, token ?? '', data )

            if ( resp !== null ) {
                if ( resp.ack === 1 ) {
                    return ResponseResult.successPost( res, resp.message )
                }
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : '01',
                    message : resp.message,
                    data : null
                } )
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : 'Failed Cek Data',
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

    public getListGudang = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceGetGudang = req.body;
        try {

            const token = await Token.get( req, res );
            const resp = await GudangRepository.getGudang( res, token ?? '', data )
            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp )
            }
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : 'Failed Cek Data',
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
