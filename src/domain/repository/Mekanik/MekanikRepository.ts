import { Response } from "express";
import { post } from "../../../core/api/api";
import { ModelMekanik,ConvertModelMekanik } from "../../models/Mekanik/ModelMekanik";
import { InterfaceGetMekanik } from "./interface/InterfaceGetMekanik";
import { InterfaceStoreMekanik } from "./interface/InterfaceStoreMekanik";

class MekanikRepository{
    public getData = async(res: Response, token: string, reqBody: InterfaceGetMekanik): Promise<ModelMekanik | null> => {
        const resp = await post(res, {
            url: '/api/Master/GETKaryawanPaging',
            token: token,
            reqBody: reqBody
        })

        if (resp !== null) {
            return ConvertModelMekanik.toModelMekanik(resp);
        }
        return null;
    }

    public storeData = async (res: Response, token: string, reqBody: InterfaceStoreMekanik): Promise<ModelMekanik | null> => {
        const resp = await post(res, {
            url: '/api/Master/PUTKaryawan',
            token: token,
            reqBody: reqBody
        })

        if (resp !== null) {
            return ConvertModelMekanik.toModelMekanik(resp);
        }
        return null;
    }
}

export default new MekanikRepository()