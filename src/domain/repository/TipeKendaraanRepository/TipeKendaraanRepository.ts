import { Response } from "express";
import { post } from "../../../core/api/api";
import { InterfaceGetTipeKendaraan } from "./interface/InterfaceGetKendaraan";
import { ConvertModelGetTipeKendaraan, ModelGetTipeKendaraan } from "../../models/TipeKendaraan/ModelGetTipeKendaraan";


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
}

export default new TipeKendaraanRepository()
