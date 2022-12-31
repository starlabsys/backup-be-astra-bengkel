import { post } from "../../../../core/api/api";
import { Response } from "express";
import { InterfaceCekKode } from "./interface/InterfaceCekKode";
import { ConvertModelCekKode, ModelCekKode } from "../../../models/DropDown/ModelCekKode";


class CekKodeRepository {
    public cekKode = async ( res : Response, token : string, props : InterfaceCekKode ) : Promise<ModelCekKode | null> => {
        const resp = await post( res, {
            url : '/api/Master/CekKodeAHASS',
            reqBody : props,
        } )
        if ( resp !== null ) {
            return ConvertModelCekKode.toModelCekKode( resp );
        }
        return null;
    }
}

export default new CekKodeRepository();
