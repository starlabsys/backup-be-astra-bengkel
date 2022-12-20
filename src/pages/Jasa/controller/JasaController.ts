import { Request, Response } from "express";
import JasaRepository from "../../../domain/repository/JasaRepository/JasaRepository";
import Token from "../../../utils/Token";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import MasterDropDownRepository from "../../../domain/repository/MasterData/Jasa/MasterDropDownRepository";


class JasaController {

    public getJasa = async ( req : Request, res : Response ) => {
        const { page, size, kodeJasa, namaJasa } = req.body;
        try {
            const token = await Token.get( req, res );
            const jasa = await JasaRepository.getJasa( res, token ?? '', {
                action : 0,
                kodeJasa : kodeJasa ?? '',
                namaJasa : namaJasa ?? '',
                pageNumber : page,
                pageSize : size,
                totalRow : 100,
                sortColumn : "ID",
                sortDirection : 0
            } )

            if ( jasa !== null ) {
                return ResponseResult.successGet( res, jasa )
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.INTERNAL_SERVER_ERROR,
                errorCode : '01',
                message : "Internal Error",
                data : null
            } )

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : e.message,
                data : e
            } )
        }

    }

    public addJasa = async ( req : Request, res : Response ) => {
        // const { }
    }

    public detailJasa = async ( req : Request, res : Response ) => {
        const { id, action } = req.body;

        try {
            const token = await Token.get( req, res );

            const jasa = await JasaRepository.detailJasa( res, token ?? '', {
                action : action,
                id : id
            } )

            return ResponseResult.successGet( res, jasa )

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : e.message,
                data : null
            } )
        }
    }

    public editJasa = async ( req : Request, res : Response ) => {
        const {
            action,
            id,
            kodeJasa,
            namaJasa,
            groupJasa,
            harga,
            pajak,
            oumKerja,
            tipeKomisi,
            satuanKomisi,
            nilaiKomisi,
            status,
            waktuPengerjaan,
            listSparepart,
            kategoriPekerjaan,
        } = req.body;
        try {
            const token = await Token.get( req, res );
            const resp = await JasaRepository.editJasa( res, token ?? '', {
                action : action,
                id : id,
                kodeJasa : kodeJasa,
                namaJasa : namaJasa,
                grupJasa : groupJasa,
                hargaJual : harga,
                pajakJual : pajak,
                oumKerja : oumKerja,
                tipeKomisi : tipeKomisi,
                satuanKomisi : satuanKomisi,
                nilaiKomisi : nilaiKomisi,
                aktif : status,
                waktuKerja : waktuPengerjaan,
                listSparePart : listSparepart,
                kategoriPekerjaanID : kategoriPekerjaan
            } )

            if ( res !== null ) {
                if ( resp?.ack === 1 ) {
                    return ResponseResult.successPost( res, resp.message )
                }
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : '01',
                    message : resp?.message ?? '',
                    data : null
                } )
            }


        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : e.message,
                data : null
            } )
        }
    }

    public cetakJasa = async ( req : Request, res : Response ) => {

        try {
            const token = await Token.get( req, res );

            const jasa = await JasaRepository.cetakReportJasa( res, token ?? '', {} )

            if ( jasa !== null ) {
                return ResponseResult.successPost( res, 'Success download report' )
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : '01',
                message : 'Failed download report',
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

    public dropDown = async ( req : Request, res : Response ) : Promise<Response> => {
        try {
            const token = await Token.get( req, res );
            // return res.status( 200 ).json( {
            //     token : token,
            // } )
            const resp = await MasterDropDownRepository.syncMaster( res, token ?? '', {
                lastSyncList : [
                    {
                        lastSyncTime : "1900-01-01 00:00:00",
                        objectName : "satuanKomisi"
                    },
                    {
                        lastSyncTime : "1900-01-01 00:00:00",
                        objectName : "RefUOM"
                    },
                    {
                        lastSyncTime : "1900-01-01 00:00:00",
                        objectName : "KategoriPekerjaan"
                    },
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
}

export default new JasaController();
