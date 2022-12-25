import { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";

import PitRepository from "../../../domain/repository/PitRepository/PitRepository";
import { InterfaceGetPit } from "../../../domain/repository/PitRepository/interface/InterfaceGetPit";
import { InterfaceStorePit } from "../../../domain/repository/PitRepository/interface/InterfaceStorePit";


class PitController {
    public getPit = async(req: Request, res: Response)=>{
        try{
            const data : InterfaceGetPit = req.body;
            const token = await Token.get(req, res)

            const resp = await PitRepository.getData(res, token ?? '', data);

            if (resp !== null) {
                console.log("Not Null");
                return ResponseResult.successGet(res, resp);
            }
            
            // console.log("Null");
            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.BAD_REQUEST,
                errorCode: "01",
                message: "Internal Error",
                data: null
            })
        }catch( e:any ){

            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.FORBIDDEN,
                errorCode: "01",
                message: e.message,
                data: null
            })
        }
    }

    public storePit = async(req: Request, res: Response)=>{
        try{
            const data : InterfaceStorePit = req.body
            const token = await Token.get(req, res)

            const resp = await PitRepository.storeData(res, token ?? '', data);

            if (resp !== null) {
                // console.log("Not Null");
                return ResponseResult.successPost(res, "Data Berhasil Disimpan");
            }
            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.BAD_REQUEST,
                errorCode: "01",
                message: "Internal Error",
                data: null
            })
        }catch(e:any){
            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.FORBIDDEN,
                errorCode: "01",
                message: e.message,
                data: null
            })
        }
    }
}

export default new PitController;