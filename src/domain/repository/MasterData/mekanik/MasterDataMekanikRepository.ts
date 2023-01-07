import { Response } from "express";
import { post } from "../../../../core/api/api";
import { InterfacePKBMekanik } from "./interface/InterfacePKBMekanik";
import { ConvertModelListMekanikPKB, ModelListMekanikPKB } from "../../../models/DropDown/ModelListMekanikPKB";


class MasterDataMekanikRepository {
    public getListMekanik = async ( res : Response, token : string, data : InterfacePKBMekanik ) : Promise<ModelListMekanikPKB | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETMekanik',
            token : token,
            reqBody : data
        } )
        if ( resp !== null ) {
            return ConvertModelListMekanikPKB.toModelListMekanikPKB( resp );
        }
        return null;
    }
}

export default new MasterDataMekanikRepository()
