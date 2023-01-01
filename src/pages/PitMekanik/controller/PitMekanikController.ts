import { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";

import PitMekanikRepository from "../../../domain/repository/PitMekanikRepository/PitMekanikRepository";
import { InterfaceGetPitMekanik } from "../../../domain/repository/PitMekanikRepository/interface/InterfaceGetPitMekanik";
import { InterfaceStorePitMekanik } from "../../../domain/repository/PitMekanikRepository/interface/InterfaceStorePitMekanik";
import ModelUsers from "../../../db/models/ModelUsers";
import GetUser from "../../../utils/GetUser";

class PitMekanikController {
    public getPitMekanik = async(req: Request, res: Response)=>{
        try{
            const data : InterfaceGetPitMekanik = req.body;
            const token = await Token.get( req, res );

            const resp = await PitMekanikRepository.getData(res, token ?? '', data);

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

    public storePitMekanik = async(req: Request, res: Response)=>{
        try {
            const data : InterfaceStorePitMekanik = req.body
            const token = await Token.get(req, res)

            const resp = await PitMekanikRepository.storeData(res, token ?? '', data)

            if (resp !== null) {
                return ResponseResult.successPost(res, "Success Store Data")
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

    public test = async(req: Request, res: Response)=>{
        try {
            const data : InterfaceGetPitMekanik = req.body

            const user = await GetUser.getUser(req, res)

            let arr_data:any[] = [];
            for (let i = 0; i < user.length; i++) {
                const resp = await PitMekanikRepository.getData(res, user[i].token ?? '', data);

                if (resp !== null) {
                    arr_data.push({
                        name : user[i].name,
                        data : resp
                    })
                    // return ResponseResult.successGet(res, resp);
                }

                // return ResponseResult.error(res, {
                //     statusCode: EnumResponseCode.BAD_REQUEST,
                //     errorCode: "01",
                //     message: "Internal Error",
                //     data: null
                // })
                
            }

            return ResponseResult.successGet(res, arr_data)
            

            // const token = await Token.get(req, res)

            // const resp = await PitMekanikRepository.test(res, token ?? '', data)

            // if (resp !== null) {
            //     return ResponseResult.successPost(res, "Success Store Data")
            // }

            // return ResponseResult.error(res, {
            //     statusCode: EnumResponseCode.BAD_REQUEST,
            //     errorCode: "01",
            //     message: "Internal Error",
            //     data: null
            // })
        } catch (error : any) {
            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.FORBIDDEN,
                errorCode: "01",
                message: error.message,
                data: null
            })
        }
    }

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

export default new PitMekanikController;