import { Response } from "express";
import { post } from "../../../core/api/api";
import { InterfaceGetPit } from "./interface/InterfaceGetPit";
import { ModelPit } from "../../models/Pit/ModelPit";
import { ConvertGetPit } from "../../models/Pit/ModelPit";
import { InterfaceStorePit } from "./interface/InterfaceStorePit";


class PitRepository {
    public getData = async(res: Response, token: string, reqBody: InterfaceGetPit): Promise<ModelPit | null> => {
        const resp = await post(res, {
            url: '/api/Master/GETPIT',
            token: token,
            reqBody: reqBody
        })

        if (resp !== null) {
            return ConvertGetPit.toGetListPit(resp);
        }
        return null;
    }

    public storeData = async(res: Response, token: string, reqBody: InterfaceStorePit): Promise<ModelPit | null> => {
        const resp = await post(res, {
            url: '/api/Master/PUTPIT',
            token: token,
            reqBody: reqBody
        })

        if (resp !== null) {
            return ConvertGetPit.toGetListPit(resp);
        }
        return null;
    }
}

export default new PitRepository()