import { Response } from "express";
import { post } from "../../../core/api/api";
import { InterfaceGetVendor } from "./interface/InterfaceGetVendor";
import { ConvertGetVendor } from "../../models/Vendor/ModelGetVendor";
// import { ConvertModelGetTipeKendaraan, ModelGetTipeKendaraan } from
// "../../models/TipeKendaraan/ModelGetTipeKendaraan";
import { ModelGetVendor } from "../../models/Vendor/ModelGetVendor";
import { InterfaceAddVendor } from "./interface/InterfaceAddVendor";
import { ConvertModelResult, ModelResult } from "../../models/Result/ModelResult";


class VendorRepository {
    public getData = async ( res : Response, token : string, reqBody : InterfaceGetVendor ) : Promise<ModelGetVendor | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETVendorPaging',
            token : token,
            reqBody : reqBody
        } )
        if ( resp !== null ) {
            return ConvertGetVendor.toWelcome( resp );
        }
        return null;
    }

    public addVendor = async ( res : Response, token : string, reqBody : InterfaceAddVendor ) : Promise<ModelResult | null> => {
        const resp = await post( res, {
            url : '/api/Master/PUTVendor',
            token : token,
            reqBody : reqBody
        } )
        if ( resp !== null ) {
            return ConvertModelResult.toModelResult( resp );
        }
        return null;
    }

    // public editData = async ( res : Response, token : string, reqBody : InterfaceEditTipeKendaraan ) :
    // Promise<ModelResult | null> => { const resp = await post( res, { url : '/api/Master/PUTTipeKendaraan', token :
    // token, reqBody : reqBody } ) if ( resp !== null ) { return ConvertModelResult.toModelResult( resp ); } return
    // null; }

}

export default new VendorRepository()
