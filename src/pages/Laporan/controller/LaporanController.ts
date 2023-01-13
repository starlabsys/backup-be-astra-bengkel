import { Request, Response } from 'express';
import { EnumResponseCode } from '../../../utils/enum/EnumResponseCode';
import ResponseResult from "../../../core/response/ResponseResult";
import Token from "../../../utils/Token";
import LaporanRepository from '../../../domain/repository/LaporanRepository/LaporanRepository';
import { InterfaceGetLaporan } from '../../../domain/repository/LaporanRepository/interface/InterfaceGetLaporan';


class LaporanController {

    public getLaporan = async ( req : Request, res : Response ) => {
        try {
            const token = await Token.get( req, res );
            const data : InterfaceGetLaporan = req.body;
            const resp = await LaporanRepository.getData( res, token ?? '', data );

            // console.log(resp.)
            if ( resp !== null ) {
                return res.status(200).json({
                    errorCode : "00",
                    status : true,
                    message : "Success",
                    data : Buffer.from(resp).toString('base64')
                })
                // return ResponseResult.successGet( res, Buffer.from(resp).toString('base64') );
            }
        }
        catch ( e:any ) {
        }
    }
}

export default new LaporanController();