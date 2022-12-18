import { Request, Response } from "express";
import JasaRepository from "../../../domain/repository/JasaRepository/JasaRepository";


class JasaController {
    public getJasa = async ( req : Request, res : Response ) => {
        await JasaRepository.getJasa( res, {
            action : 0,
            kodeJasa : "",
            namaJasa : "",
            pageNumber : 3,
            pageSize : 10,
            totalRow : 100,
            sortColumn : "ID",
            sortDirection : 0
        } )
    }
}

export default new JasaController();
