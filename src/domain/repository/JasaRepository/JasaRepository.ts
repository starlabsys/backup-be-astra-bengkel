import { post, put } from "../../../core/api/api";
import { Response } from "express";
import { ConvertModelJasa, ModelJasa } from "../../models/Jasa/ModelJasa";
import { ConvertModelDetailJasa, ModelDetailJasa } from "../../models/Jasa/ModelDetailJasa";
import { InterfaceEditJasa } from "./interface/InterfaceEditJasa";
import { InterfaceGetJasa } from "./interface/InterfaceGetJasa";
import { ConvertModelResult, ModelResult } from "../../models/Result/ModelResult";
import { ModelPutJasa } from "./interface/InterfacePutJasa";
import { InterfaceAddJasa } from "./interface/InterfaceAddJasa";
import ResponseResult from "../../../core/response/ResponseResult";
import { Convert, DetailGetJasa } from "../../models/Jasa/DetailGetJasa";


class JasaRepository {
    public getJasa = async (res: Response, token: string, props: InterfaceGetJasa): Promise<ModelJasa | null> => {
        // console.log("reqbody", props);
        const resp = await post(res, {
            url: '/api/Master/GETJasaPaging',
            reqBody: props,
            token: token
        })

        // console.log("repository", resp)
        if (resp !== null) {
            return ConvertModelJasa.toModelJasa(resp);
        }
        return null;
    }

    public GetJasaSpesific = async (res: Response, token: string, props: {}): Promise<DetailGetJasa | null> => {

        // console.log("reqbody", props)
        const resp = await post(res, {
            url: '/api/Master/GETJasa',
            reqBody: props,
            token: token
        })

        // console.log("RESPON DATA", resp)
        if (resp !== null) {
            return Convert.toDetailGetJasa(resp);
        }
        return null;
    }


    public detailJasa = async (res: Response, token: string, props: {
        action: number,
        id: number,
    }): Promise<ModelDetailJasa | null> => {
        const resp = await post(res, {
            url: '/api/Master/GETJasaDetail',
            token: token,
            reqBody: props
        })
        return ConvertModelDetailJasa.toModelDetailJasa(resp);
    }

    public cetakReportJasa = async (res: Response, token: string, props: {}) => {
        return await post(res, {
            url: '/api/ShowReport/GETShowReportJasa',
            token: token,
            reqBody: props
        });
    }

    public putJasa = async (res: Response, token: string, props: ModelPutJasa): Promise<ModelResult | null> => {
        const resp = await post(res, {
            url: '/api/Master/PUTJasa',
            token: token,
            reqBody: props
        });
        if (resp !== null) {
            return ConvertModelResult.toModelResult(resp);
        }
        return null;
    }

    public addJasa = async (res: Response, token: string, props: InterfaceAddJasa): Promise<ModelResult | null> => {
        const resp = await post(res, {
            url: '/api/Master/PUTJasa',
            token: token,
            reqBody: props
        });
        if (resp !== null) {
            return ConvertModelResult.toModelResult(resp);
        }
        return null;
    }
}

export default new JasaRepository();
