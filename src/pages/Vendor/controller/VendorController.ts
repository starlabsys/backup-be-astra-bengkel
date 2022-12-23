import { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";
import VendorRepository from "../../../domain/repository/VendorRepository/VendorRepository";
import { InterfaceGetVendor } from "../../../domain/repository/VendorRepository/interface/InterfaceGetVendor";
// import TipeKendaraanRepository from "../../../domain/repository/TipeKendaraanRepository/TipeKendaraanRepository";
// import {
//     InterfaceGetTipeKendaraan
// } from "../../../domain/repository/TipeKendaraanRepository/interface/InterfaceGetKendaraan";
// import {
//     InterfaceEditTipeKendaraan
// } from "../../../domain/repository/TipeKendaraanRepository/interface/InterfaceEditTipeKendaraan";

class VendorController {
    public getVendor = async(req: Request, res: Response)=>{

        try{
            const data : InterfaceGetVendor = req.body;
            const token = await Token.get( req, res );

            const resp = await VendorRepository.getData(res, token ?? '', data);

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
            // 
            return ResponseResult.error(res, {
                statusCode: EnumResponseCode.FORBIDDEN,
                errorCode: "01",
                message: error.message,
                data: null
            })
        }
    }
}

export default new VendorController;
