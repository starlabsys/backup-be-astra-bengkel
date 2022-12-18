import { post } from "../../../core/api/api";
import { Response } from "express";
import { ConvertModelJasa, ModelJasa } from "../../models/Jasa/ModelJasa";
import { ConvertModelDetailJasa, ModelDetailJasa } from "../../models/Jasa/ModelDetailJasa";
import { InterfaceEditJasa } from "./interface/InterfaceEditJasa";
import { InterfaceGetJasa } from "./interface/InterfaceGetJasa";
import { ConvertModelResult, ModelResult } from "../../models/Result/ModelResult";


class JasaRepository {
    public getJasa = async ( res : Response, token : string, props : InterfaceGetJasa ) : Promise<ModelJasa | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETJasaPaging',
            reqBody : props,
            token : token
        } )
        if ( resp !== null ) {
            return ConvertModelJasa.toModelJasa( resp );
        }
        return null;
    }

    public detailJasa = async ( res : Response, token : string, props : {
        action : number,
        id : number,
    } ) : Promise<ModelDetailJasa | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETJasaDetail',
            token : token,
            reqBody : props
        } )
        return ConvertModelDetailJasa.toModelDetailJasa( resp );
    }

    public editJasa = async ( res : Response, token : string, props : InterfaceEditJasa ) : Promise<ModelResult | null> => {
        const resp = await post( res, {
            url : '/api/Master/PUTJasa',
            token : token,
            reqBody : props
        } );
        if ( resp !== null ) {
            return ConvertModelResult.toModelResult( resp );
        }
        return null;
    }

    public cetakReportJasa = async ( res : Response, token : string, props : {} ) => {
        return await post( res, {
            url : '/api/ShowReport/GETShowReportJasa',
            token : token,
            reqBody : props
        } );
    }
}

export default new JasaRepository();
