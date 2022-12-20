import { Response } from "express";
import { post } from "../../../../core/api/api";
import { InterfaceSyncMaster } from "./interface/InterfaceSyncMaster";


class MasterDropDownRepository {
    public syncMaster = async ( res : Response, token : string, props : InterfaceSyncMaster ) : Promise<any> => {
        const resp = await post( res, {
            url : '/api/Master/SyncMaster',
            reqBody : props,
            token : token,
        } )
    }
}


export default new MasterDropDownRepository();
