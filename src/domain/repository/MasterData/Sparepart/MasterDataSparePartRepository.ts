import { Response } from "express";
import { InterfaceParameterListSparepart } from "./interface/InterfaceParameterListSparepart";
import { post } from "../../../../core/api/api";
import { InterfaceDetailSparepart } from "./interface/InterfaceDetailSparepart";
import {
    ConvertModelParameterDetailSparepart,
    ModelParameterDetailSparepart
} from "../../../models/DropDown/ModelParameterDetailSparepart";
import {
    ConvertModelParameterListSparepart,
    ModelParameterListSparepart
} from "../../../models/DropDown/ModelParameterListSparepart";


class MasterDataSparePartRepository {
    public getListSparePart = async ( res : Response, token : string, data : InterfaceParameterListSparepart ) : Promise<ModelParameterListSparepart | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETSparepart',
            token : token,
            reqBody : data
        } )
        if ( resp !== null ) {
            return ConvertModelParameterListSparepart.toModelParameterListSparepart( resp );
        }
        return null;
    }

    public getDetailSparePart = async ( res : Response, token : string, data : InterfaceDetailSparepart ) : Promise<ModelParameterDetailSparepart | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETSparepartDetail',
            token : token,
            reqBody : data
        } )
        if ( resp !== null ) {
            return ConvertModelParameterDetailSparepart.toModelParameterDetailSparepart( resp );
        }
        return null;
    }
}

export default new MasterDataSparePartRepository()
