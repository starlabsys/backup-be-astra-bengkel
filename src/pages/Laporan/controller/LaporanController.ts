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

            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp );
            }
        }
        catch ( e:any ) {
        }
    }
}

export default new LaporanController();