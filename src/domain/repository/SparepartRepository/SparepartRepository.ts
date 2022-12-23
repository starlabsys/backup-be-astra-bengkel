import { post } from "../../../core/api/api";
import { Response } from "express";
import { InterfaceSparepart } from "./interface/interfaceSparepart";
import { ConvertModelSparepart, ModelSparepart } from "../../models/Sparepart/ModelSparepart";
import { InterfaceGetSparepart } from "./interface/InterfaceGetSparepart";


class SparepartRepository {
    public getData = async ( res : Response, token : string, props : InterfaceGetSparepart ) : Promise<ModelSparepart | null> => {
        const resp = await post( res, {
            url : "/api/Master/GETSparepartPaging",
            token : token,
            reqBody : props
        } );
        if ( resp !== null ) {
            return ConvertModelSparepart.toModelSparepart( resp );
        }
        return null;
    }

    public addSparepart = async ( res : Response, token : string, props : InterfaceAddSparepart ) : Promise<ModelSparepart | null> => {
        //
        const resp = await post( res, {
            url : "api/Master/PUTSparepart",
            token : token,
            reqBody : props,
        } );

        console.log( 'errrossparepart', resp )

        if ( resp !== null ) {
            return ConvertModelSparepart.toModelSparepart( resp );
        }

        return null;
    }
}

export default new SparepartRepository()
