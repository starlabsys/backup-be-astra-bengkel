import { Response } from "express";
import { post } from "../../../core/api/api";
import { InterfaceGetPkb } from "./interface/InterfaceGetPkb";
import { ModelOfPKB, Convert } from "../../models/Pkb/ModelPkb";
import { InterfaceStorePkb } from "./interface/InterfaceStorePkb";
import { InterfaceDetailPkb } from "./interface/InterfaceDetailPkb";
import { InterfaceProsesPKB } from "./interface/InterfaceProsesPKB";
import { ConvertModelResult, ModelResult } from "../../models/Result/ModelResult";
import { InterfaceAddDataServices } from "../../../pages/Pkb/model/ModelAddExcelPkb";
// import { InterfaceGetPitMekanik } from "./interface/InterfaceGetPitMekanik";
// import { ModelPitMekanik,ConvertGetPitMekanik } from "../../models/PitMekanik/ModelPitMekanik";
// import { InterfaceStorePitMekanik } from "./interface/InterfaceStorePitMekanik";

class PkbRepository {
    public getData = async ( res : Response, token : string, reqBody : InterfaceGetPkb ) : Promise<ModelOfPKB | null> => {
        const resp = await post( res, {
            url : '/api/Service/GETPKBPaging',
            token : token,
            reqBody : reqBody
        } )
        if ( resp !== null ) {
            return Convert.toModelOfPKB( resp );
        }
        return null;
    }

    public storeData = async ( res : Response, token : string, reqBody : InterfaceStorePkb ) : Promise<ModelOfPKB | null> => {
        const resp = await post( res, {
            url : '/api/Service/PUTPKB',
            token : token,
            reqBody : reqBody
        } )
        if ( resp !== null ) {
            return Convert.toModelOfPKB( resp );
        }
        return null;
    }

    public storeDataExcel = async ( res : Response, token : string, reqBody : InterfaceAddDataServices ) : Promise<ModelOfPKB | null> => {
        const resp = await post( res, {
            url : '/api/Service/PUTPKB',
            token : token,
            reqBody : reqBody
        } )
        if ( resp !== null ) {
            return Convert.toModelOfPKB( resp );
        }
        return null;
    }

    public detailData = async ( res : Response, token : string, reqBody : InterfaceDetailPkb ) : Promise<ModelOfPKB | null> => {
        const resp = await post( res, {
            url : '/api/Service/GETPKBDetail',
            token : token,
            reqBody : reqBody
        } )
        if ( resp !== null ) {
            return Convert.toModelOfPKB( resp );
        }
        return null;
    }

    public prosesPKB = async ( res : Response, token : string, reqBody : InterfaceProsesPKB ) : Promise<ModelResult | null> => {
        const resp = await post( res, {
            url : '/api/Service/PUTAlokasiPekerjaan',
            token : token,
            reqBody : reqBody
        } )
        if ( resp !== null ) {
            return ConvertModelResult.toModelResult( resp );
        }
        return null;
    }
}

export default new PkbRepository()
