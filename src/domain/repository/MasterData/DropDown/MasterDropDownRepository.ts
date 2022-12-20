import { Response } from "express";
import { post } from "../../../../core/api/api";
import { InterfaceSyncMaster } from "./interface/InterfaceSyncMaster";
import { ConvertModelDropDownJasa, ModelDropDownJasa } from "../../../models/DropDown/ModelDropDownJasa";
import { InterfaceMasterData } from "./interface/InterfaceMasterData";
import { ConvertModelGroupDropDownJasa, ModelGroupDropDownJasa } from "../../../models/DropDown/ModelGroupDropDown";


class MasterDropDownRepository {
    public syncMaster = async ( res : Response, token : string, props : InterfaceSyncMaster ) : Promise<ModelDropDownJasa | null> => {

        const resp = await post( res, {
            url : '/api/Master/SynchMaster',
            reqBody : props,
            token : token,
        } )
        if ( resp !== null ) {
            return ConvertModelDropDownJasa.toModelDropDownJasa( resp );
        }
        return null;
    }

    public masterDropDown = async ( res : Response, token : string, props : InterfaceMasterData ) : Promise<ModelGroupDropDownJasa | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETMasterDropDown',
            token : token,
            reqBody : props
        } )
        if ( resp !== null ) {
            return ConvertModelGroupDropDownJasa.toModelGroupDropDownJasa( resp );
        }
        return null;
    }
}


export default new MasterDropDownRepository();
