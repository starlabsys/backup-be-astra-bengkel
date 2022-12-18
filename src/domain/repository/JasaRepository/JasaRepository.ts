import { post } from "../../../core/api/api";
import { Response } from "express";


class JasaRepository {
    public getJasa = async ( res : Response, props : {
        action : number,
        kodeJasa : string,
        namaJasa : string,
        pageNumber : number,
        pageSize : number,
        totalRow : number,
        sortColumn : string,
        sortDirection : number
    } ) => {
        return post( res, {
            url : '/api/Master/GETJasaPaging',
            reqBody : props
        } )
    }
}

export default new JasaRepository();
