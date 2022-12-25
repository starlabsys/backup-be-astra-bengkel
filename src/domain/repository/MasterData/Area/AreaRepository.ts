import { Response } from "express";
import { post } from "../../../../core/api/api";
import { InterfaceGetListAreaKalBar } from "./interface/InterfaceGetListAreaKalBar";
import { ConvertModelListAreaKalBar, ModelListAreaKalBar } from "../../../models/Area/ModelListAreaKalBar";


class AreaRepository {
    public getListAreaKalBar = async ( res : Response, token : string, props : InterfaceGetListAreaKalBar ) : Promise<ModelListAreaKalBar | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETArea',
            token : token,
            reqBody : props
        } )
        if ( resp !== null ) {
            return ConvertModelListAreaKalBar.toModelListAreaKalBar( resp );
        }
        return null;
    }
}

export default new AreaRepository()
