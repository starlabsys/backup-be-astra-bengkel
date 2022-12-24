import { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";

import PitMekanikRepository from "../../../domain/repository/PitMekanikRepository/PitMekanikRepository";
import { InterfaceGetPitMekanik } from "../../../domain/repository/PitMekanikRepository/interface/InterfaceGetPitMekanik";

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
        // const data : InterfaceStorePitMekanik = req.body
    }
}

export default new PitMekanikController;