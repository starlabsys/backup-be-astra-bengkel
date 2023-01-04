import { InterfaceGetGudang } from "./interface/InterfaceGetGudang";
import { post } from "../../../../core/api/api";
import { Response } from "express";
import { ConvertModelListGudang, ModelListGudang } from "../../../models/DropDown/ModelListGudang";


class GudangRepository {
    public getGudang = async ( res : Response, token : string, data : InterfaceGetGudang ) : Promise<ModelListGudang | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETGudang',
            token : token,
            reqBody : data
        } )
        if ( resp !== null ) {
            return ConvertModelListGudang.toModelListGudang( resp );
        }
        return null;
    }
}

export default new GudangRepository();
