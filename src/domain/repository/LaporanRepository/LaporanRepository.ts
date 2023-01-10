import { post, put } from "../../../core/api/api";
import { Response } from "express";
import { InterfaceGetLaporan } from "./interface/InterfaceGetLaporan";
import { ModelLaporanOfPkb,Convert } from "../../models/Laporan/ModelLaporan";
// import { InterfaceGetLaporan } from "./interface/InterfaceGetLaporan";


class LaporanRepository {
    public getData = async ( res : Response, token : string, reqBody : InterfaceGetLaporan ) : Promise<ModelLaporanOfPkb | null> => {
        const resp = await post( res, {
            url : '/api/ShowForm/ShowReportSummaryPKBMonthly',
            reqBody : reqBody,
            token : token
        } )
        if ( resp !== null ) {
            return resp
        }
        return null;
    }



    // public addJasa = async ( res : Response, token : string, props : InterfaceAddJasa ) : Promise<ModelResult | null> => {
    //     const resp = await post( res, {
    //         url : '/api/Master/PUTJasa',
    //         token : token,
    //         reqBody : props
    //     } );
    //     if ( resp !== null ) {
    //         return ConvertModelResult.toModelResult( resp );
    //     }
    //     return null;
    // }
}

export default new LaporanRepository();
