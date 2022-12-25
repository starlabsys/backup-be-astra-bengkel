import { Response } from "express";
import { InterfaceGetCustomer } from "./interface/InterfaceGetCustomer";
import { post } from "../../../core/api/api";
import { ConvertModelGetListCustomer, ModelGetListCustomer } from "../../models/Customer/ModelGetListCustomer";
import { InterfaceAddCustomer } from "./interface/InterfaceAddCustomer";
import { ConvertModelResult, ModelResult } from "../../models/Result/ModelResult";
import { InterfaceEditCustomer } from "./interface/InterfaceEditCustomer";
import { InterfaceDetailCustomer } from "./interface/InterfaceDetailCustomer";
import { ConvertModelDetailCustomer, ModelDetailCustomer } from "../../models/Customer/ModelDetailCustomer";


class CustomerRepository {
    public get = async ( res : Response, token : string, props : InterfaceGetCustomer ) : Promise<ModelGetListCustomer | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETPelangganPaging',
            reqBody : props,
            token : token
        } )
        if ( resp !== null ) {
            return ConvertModelGetListCustomer.toModelGetListCustomer( resp );
        }
        return null;
    }

    public add = async ( res : Response, token : string, props : InterfaceAddCustomer ) : Promise<ModelResult | null> => {
        const resp = await post( res, {
            url : '/api/Master/PUTPelanggan',
            reqBody : props,
            token : token
        } )
        if ( resp !== null ) {
            return ConvertModelResult.toModelResult( resp );
        }
        return null;
    }

    public update = async ( res : Response, token : string, props : InterfaceEditCustomer ) : Promise<ModelResult | null> => {
        const resp = await post( res, {
            url : '/api/Master/PUTPelanggan',
            reqBody : props,
            token : token
        } )
        if ( resp !== null ) {
            return ConvertModelResult.toModelResult( resp );
        }
        return null;
    }

    public detail = async ( res : Response, token : string, props : InterfaceDetailCustomer ) : Promise<ModelDetailCustomer | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETPelangganDetail',
            reqBody : props,
            token : token
        } )
        if ( resp !== null ) {
            return ConvertModelDetailCustomer.toModelDetailCustomer( resp );
        }
        return null;
    }
}

export default new CustomerRepository()
