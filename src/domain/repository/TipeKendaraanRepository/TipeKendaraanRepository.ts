import { Response } from "express";
import { post } from "../../../core/api/api";
import { InterfaceGetTipeKendaraan } from "./interface/InterfaceGetKendaraan";
import { ConvertModelGetTipeKendaraan, ModelGetTipeKendaraan } from "../../models/TipeKendaraan/ModelGetTipeKendaraan";
import { InterfaceEditTipeKendaraan } from "./interface/InterfaceEditTipeKendaraan";
import { ConvertModelResult, ModelResult } from "../../models/Result/ModelResult";


class TipeKendaraanRepository {
    public getData = async ( res : Response, token : string, reqBody : InterfaceGetTipeKendaraan ) : Promise<ModelGetTipeKendaraan | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETTipeKendaraanPaging',
            token : token,
            reqBody : reqBody
        } )
        if ( resp !== null ) {
            return ConvertModelGetTipeKendaraan.toModelGetTipeKendaraan( resp );
        }
        return null;
    }

    public editData = async ( res : Response, token : string, reqBody : InterfaceEditTipeKendaraan ) : Promise<ModelResult | null> => {
        const resp = await post( res, {
            url : '/api/Master/PUTTipeKendaraan',
            token : token,
            reqBody : reqBody
        } )
        if ( resp !== null ) {
            return ConvertModelResult.toModelResult( resp );
        }
        return null;
    }

}

export default new TipeKendaraanRepository()
