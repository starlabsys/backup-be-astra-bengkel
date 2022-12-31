import { Response } from "express";
import { post } from "../../../core/api/api";
import { InterfaceGetPkb } from "./interface/InterfaceGetPkb";
import { ModelOfPKB,Convert } from "../../models/Pkb/ModelPkb";
// import { InterfaceGetPitMekanik } from "./interface/InterfaceGetPitMekanik";
// import { ModelPitMekanik,ConvertGetPitMekanik } from "../../models/PitMekanik/ModelPitMekanik";
// import { InterfaceStorePitMekanik } from "./interface/InterfaceStorePitMekanik";

class PkbRepository {
    public getData = async(res: Response, token: string, reqBody: InterfaceGetPkb): Promise<ModelOfPKB | null> => {
        const resp = await post(res, {
            url: '/api/Service/GETPKBPaging',
            token: token,
            reqBody: reqBody
        })
        if(resp !== null){
            return Convert.toModelOfPKB(resp);
        }
        return null;
    }

    public storeData = async (res: Response, token: string, reqBody: InterfaceGetPkb): Promise<ModelOfPKB | null> => {
        const resp = await post(res, {
            url: '/api/Service/PUTPKB',
            token: token,
            reqBody: reqBody
        })
        if (resp !== null) {
            return Convert.toModelOfPKB(resp);
        }
        return null;
    }
}

export default new PkbRepository()