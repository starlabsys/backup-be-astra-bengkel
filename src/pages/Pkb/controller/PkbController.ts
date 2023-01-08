import e, { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";

import PitMekanikRepository from "../../../domain/repository/PitMekanikRepository/PitMekanikRepository";
// import { InterfaceGetPitMekanik } from "../../../domain/repository/PitMekanikRepository/interface/InterfaceGetPitMekanik";
// import { InterfaceStorePitMekanik } from "../../../domain/repository/PitMekanikRepository/interface/InterfaceStorePitMekanik";
import { InterfaceGetPkb } from "../../../domain/repository/PkbRepository/interface/InterfaceGetPkb";
import PkbRepository from "../../../domain/repository/PkbRepository/PkbRepository";
import { InterfaceStorePkb } from "../../../domain/repository/PkbRepository/interface/InterfaceStorePkb";
import { InterfaceDetailPkb } from "../../../domain/repository/PkbRepository/interface/InterfaceDetailPkb";
import KendaraanRepository from "../../../domain/repository/Kendaraan/KendaraanRepository";
import JasaRepository from "../../../domain/repository/JasaRepository/JasaRepository";
import { InterfaceGetJasa } from "../../../domain/repository/JasaRepository/interface/InterfaceGetJasa";


class PkbController {
    public getPkb = async ( req : Request, res : Response ) => {
        try {

            // if (req.app.locals.credential.role == 'admin') {
            //     const data = req.body;
            //     const user_id = req.params.user_id;
            //
            //     const token = await Token.getDetail(req,res, user_id);
            //
            //     ResponseResult.successGet(res, token)
            //
            // }else{

            const data : InterfaceGetPkb = req.body;
            const token = await Token.get( req, res );

            const resp = await PkbRepository.getData( res, token ?? '', data );

            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp );
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : "01",
                message : "Internal Error",
                data : null
            } )
            // }

        } catch ( error : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                message : error.message,
                data : null
            } )
        }
    }

    public storePkb = async ( req : Request, res : Response ) => {
        try {

            const data : InterfaceStorePkb = req.body
            const token = await Token.get( req, res )

            const resp = await PkbRepository.storeData( res, token ?? '', data )

            if ( resp !== null ) {

                // console.log(resp.pkbID)
                if ( resp.pkbID ) {

                    return ResponseResult.error( res, {
                        statusCode : EnumResponseCode.BAD_REQUEST,
                        errorCode : "01",
                        message : resp.message,
                        data : null
                    } )

                }

                return ResponseResult.successPost( res, resp.message )
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : "01",
                message : "Internal Error",
                data : null
            } )
        } catch ( error : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                message : error.message,
                data : null
            } )
        }
    }

    public detailPkb = async ( req : Request, res : Response ) => {
        try {
            const data : InterfaceDetailPkb = req.body
            const token = await Token.get( req, res )

            const resp = await PkbRepository.detailData( res, token ?? '', data )

            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp )
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : "01",
                message : "Internal Error",
                data : null
            } )
        } catch ( error : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                message : error.message,
                data : null
            } )
        }
    }

    public importPkb = async ( req : Request, res : Response ) => {
        // if (req.app.locals.credential.role === 'admin') {
        const data = req.body;
        const user_id = req.params.user_id;
        // console.log(user_id)

        const token = await Token.getDetail( req, res, user_id );

        console.log( token )

        for ( const element of data ) {

            // const resp = await KendaraanRepository.detailKendaraan( res, token ?? '', data );
            // Get Jasa Detail

            const jasa : any = await JasaRepository.getJasa( res, token ?? '', {
                action : 0,
                kodeJasa : element.kode_jasa,
                namaJasa : "",
                pageNumber : 1,
                pageSize : 10,
                sortColumn : "ID",
                sortDirection : 0,
                totalRow : 1000,
            } )

            // console.log(jasa.listofJasa)

            const checkJasa = await jasa.listofJasa.find( ( item : InterfaceGetJasa ) => item.kodeJasa === element.kodeJasa )
            // console.log(checkJasa)


            if ( !checkJasa ) {
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : "01",
                    message : "Kode Jasa Tidak Ditemukan",
                    data : null
                } )
            }
            else {
                const dataJasa : any = {
                    "guid" : "5fd4da87",
                    "pkbID" : 0,
                    "pkbPekerjaanID" : 0,
                    "itemNo" : 10,
                    "refJobID" : checkJasa.id,
                    "nilaiDiskon" : checkJasa.nilaiDiskon,
                    "nilaiDiskonJasa" : checkJasa.nilaiDiskon,
                    "persentaseDiskon" : 0,
                    "persentaseDiskonJasa" : checkJasa.persentaseDiskon,
                    "totalJasa" : checkJasa.hargaJual,
                    "pajakJasa" : checkJasa.pajakJual,
                    "hargaPekerjaan" : checkJasa.hargaJual,
                    "namaPekerjaan" : checkJasa.namaJasa,
                    "isOPL" : false,
                    "labelisOPL" : "Tidak",
                    "listOfMaterial" : [],
                    "listOfMaterialHotline" : [],
                    "kodeJasa" : checkJasa.kodeJasa + ' - ' + checkJasa.namaJasa,
                    "idJasa" : 240,
                    "isShowDelete" : true,
                    "isEditable" : true,
                    "isFreeService" : false,
                    "markUpJasa" : 0,
                    "vendorID" : "",
                    "flatRate" : 45,
                    "noClaimC2" : "",
                    "noBuku" : "",
                    "isAdditionalPekerjaan" : 0
                }

                return ResponseResult.successPost( res, dataJasa )
            }

            // const checkKendaraan = await KendaraanRepository.get(res, token ?? '', {
            //     action: 0,
            //     noMesin: element.no_mesin,
            //     noPolisi: "",
            //     pageNumber: 1,
            //     pageSize: 10,
            //     totalRow: 0,
            //     sortColumn: "ID",
            //     sortDirection: 0
            //     })

            //     if (!checkKendaraan) {
            //         return ResponseResult.error(res, {
            //             statusCode: EnumResponseCode.BAD_REQUEST,
            //             errorCode: "01",
            //             message: "Kode Jasa Tidak Ditemukan",
            //             data: null
            //         })
            //     }else{
            //         // console.clelog(checkKendaraan)
            //         // const dataKendaraan : any ={

            //         // }
            //     }

            // console.log(kendaraan)

            // console.log(checkJasa)
            // try{

            //         // Get Parts Detail


            //         // Get Kendaraan by No Mesin / No Rangka


            //         // const resp = await PkbRepository.storeData(res, token ?? '', element)


            //         return ResponseResult.successGet(res, checkJasa)
            //     }

            //     // return ResponseResult.successGet(res, "sukses")

            // }catch(e:any)
            // {
            //     return ResponseResult.error(res, {
            //         statusCode: EnumResponseCode.FORBIDDEN,
            //         errorCode: "01",
            //         message: e.message,
            //         data: null
            //     })
            // }
            // ResponseResult.successGet(res, token)
            // }

        }

    }
}

export default new PkbController;
