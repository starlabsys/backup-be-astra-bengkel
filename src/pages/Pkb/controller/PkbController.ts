import { Request, Response } from "express";
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

class PkbController {
    public getPkb = async(req: Request, res: Response)=>{
        try{
            const data : InterfaceGetPkb = req.body;
            const token = await Token.get( req, res );

            const resp = await PkbRepository.getData(res, token ?? '', data);

            if (resp !== null) {
                return ResponseResult.successGet(res, resp);
            }

            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.BAD_REQUEST,
                errorCode: "01",
                message: "Internal Error",
                data: null
            })

        }catch(error: any){
            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.FORBIDDEN,
                errorCode: "01",
                message: error.message,
                data: null
            })
        }
    }

    public storePkb = async(req: Request, res: Response)=>{
        try {
            const data : InterfaceStorePkb = req.body
            const token = await Token.get(req, res)

            const resp = await PkbRepository.storeData(res, token ?? '', data)

            if (resp !== null) {
                
                // console.log(resp.pkbID)
                if ( resp.pkbID ) {

                    return ResponseResult.error(res, {
                        statusCode: EnumResponseCode.BAD_REQUEST,
                        errorCode: "01",
                        message: resp.message,
                        data: null
                    })

                }

                return ResponseResult.successPost(res, resp.message)
            }

            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.BAD_REQUEST,
                errorCode: "01",
                message: "Internal Error",
                data: null
            })
        } catch (error : any) {
            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.FORBIDDEN,
                errorCode: "01",
                message: error.message,
                data: null
            })
        }
    }

    public detailPkb = async(req: Request, res: Response)=>{
        try {
            const data : InterfaceDetailPkb = req.body
            const token = await Token.get(req, res)

            const resp = await PkbRepository.detailData(res, token ?? '', data)

            if (resp !== null) {
                return ResponseResult.successGet(res, resp)
            }

            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.BAD_REQUEST,
                errorCode: "01",
                message: "Internal Error",
                data: null
            })
        } catch (error : any) {
            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.FORBIDDEN,
                errorCode: "01",
                message: error.message,
                data: null
            })
        }
    }

    // public storePitMekanik = async(req: Request, res: Response)=>{
    //     try {
    //         const data : InterfaceStorePitMekanik = req.body
    //         const token = await Token.get(req, res)

    //         const resp = await PitMekanikRepository.storeData(res, token ?? '', data)

    //         if (resp !== null) {
    //             return ResponseResult.successPost(res, "Success Store Data")
    //         }

    //         return ResponseResult.error(res, {
    //             statusCode: EnumResponseCode.BAD_REQUEST,
    //             errorCode: "01",
    //             message: "Internal Error",
    //             data: null
    //         })
    //     } catch (error : any) {
    //         return ResponseResult.error(res, {
    //             statusCode: EnumResponseCode.FORBIDDEN,
    //             errorCode: "01",
    //             message: error.message,
    //             data: null
    //         })
    //     }

    // }

    // public detailPitMekanik = async(req: Request, res: Response)=>{
    //     try {
    //         const data : InterfaceGetPitMekanik = req.body
    //         const token = await Token.get(req, res)

    //         const resp = await PitMekanikRepository.detailData(res, token ?? '', data)

    //         if (resp !== null) {
    //             return ResponseResult.successGet(res, resp)
    //         }

    //         return ResponseResult.error(res, {
    //             statusCode: EnumResponseCode.BAD_REQUEST,
    //             errorCode: "01",
    //             message: "Internal Error",
    //             data: null
    //         })
    //     } catch (error : any) {
    //         return ResponseResult.error(res, {
    //             statusCode: EnumResponseCode.FORBIDDEN,
    //             errorCode: "01",
    //             message: error.message,
    //             data: null
    //         })
    //     }

    // }
}

export default new PkbController;