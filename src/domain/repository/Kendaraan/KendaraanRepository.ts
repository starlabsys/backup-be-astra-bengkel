import { Response } from "express";
import { post } from "../../../core/api/api";
import { InterfaceGetKendaraan } from "./interface/InterfaceGetKendaraan";
import { ConvertModelGetListKendaraan, ModelGetListKendaraan } from "../../models/Kendaraan/ModelGetListKendaraan";
import { InterfaceGetPelanggan } from "./interface/InterfaceGetPelanggan";
import {
    ConvertModelGetListPelanggan,
    ModelGetListPelanggan
} from "../../models/Kendaraan/ModelGetListPelanggan";


class KendaraanRepository {
    public get = async ( res : Response, token : string, reqBody : InterfaceGetKendaraan ) : Promise<ModelGetListKendaraan | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETKendaraanPaging',
            token : token,
            reqBody : reqBody
        } )
        if ( resp !== null ) {
            return ConvertModelGetListKendaraan.toModelGetListKendaraan( resp );
        }
        return null;
    }

    public getPelanggan = async ( res : Response, token : string, reqBody : InterfaceGetPelanggan ) : Promise<ModelGetListPelanggan | null> => {
        const resp = await post( res, {
            url : '/api/Master/GETPelanggan',
            token : token,
            reqBody : reqBody
        } )
        if ( resp !== null ) {
            return ConvertModelGetListPelanggan.toModelGetListCustomer( resp );
        }
        return null;
    }
}

export default new KendaraanRepository()
