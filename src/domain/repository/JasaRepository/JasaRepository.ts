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
            url : '/Master/GETJasaPaging',
            reqBody : {
                "action" : props.action,
                "kodeJasa" : props.kodeJasa,
                "namaJasa" : props.namaJasa,
                "pageNumber" : props.pageNumber,
                "pageSize" : props.pageSize,
                "totalRow" : props.totalRow,
                "sortColumn" : props.sortColumn,
                "sortDirection" : props.sortDirection
            }
        } )
    }
}

export default new JasaRepository();
