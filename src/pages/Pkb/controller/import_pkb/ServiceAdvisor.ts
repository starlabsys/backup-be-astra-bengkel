import MekanikRepository from "../../../../domain/repository/Mekanik/MekanikRepository"
import { ModelParamPkb } from "../../model/ModelParamPkb"
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb"
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb"
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB"

class ServiceAdvisor {
    public checkServiceAdvisor = async ( props : ModelParamPkb ) : Promise<ModelResultImportPkb> => {
        try{
            const getSa = await MekanikRepository.detail( props.res, props.token ?? '', {
                tipe : 23,
                namaMekanik : props.data.service_advisor
            } )

            if (getSa !== null) {
                if (getSa.ack === 1) {
                    return ResponseImportPkb( {
                        status : EnumErrorImportPKB.success,
                        data : "Ya"
                    } )
                } else {
                    // return ResponseImportPkb( {
                    //     status : EnumErrorImportPKB.success,
                    //     data : "Tidak"
                    // } )
                    // create service advisor todo
                    // TODO: create service advisor
                }
            }

            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : "getSa"
            } )

        }catch(e:any){
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : e
            } )
        }   
    }
}

export default new ServiceAdvisor()