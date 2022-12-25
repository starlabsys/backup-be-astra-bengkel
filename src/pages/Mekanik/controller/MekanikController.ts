import { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";
import MekanikRepository from "../../../domain/repository/Mekanik/MekanikRepository";
import { InterfaceGetMekanik } from "../../../domain/repository/Mekanik/interface/InterfaceGetMekanik";
import { InterfaceStoreMekanik } from "../../../domain/repository/Mekanik/interface/InterfaceStoreMekanik";

class MekanikController{
    public getMekanik = async(req: Request, res: Response)=>{
        try{
            const data : InterfaceGetMekanik = req.body;
            const token = await Token.get(req, res);

            const resp = await MekanikRepository.getData(res, token ?? '', data);

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

    public storeMekanik = async(req: Request, res: Response)=>{
        try{
            const data : InterfaceStoreMekanik = req.body;
            const token = await Token.get(req, res);

            const resp = await MekanikRepository.storeData(res, token ?? '', data);

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
}

export default new MekanikController;