import { Response } from "express";
import { ModelListExcel } from "./ModelListExcel";


export interface ModelParamPkb {
    res : Response
    token : string
    data : ModelListExcel
}
