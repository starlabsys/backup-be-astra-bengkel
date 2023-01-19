import MekanikRepository from "../../../../domain/repository/Mekanik/MekanikRepository"
import { ModelParamPkb } from "../../model/ModelParamPkb"
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb"
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb"
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB"

class FinalInspectorPkb {
    public checkFinalInspector = async ( props : ModelParamPkb ) : Promise<ModelResultImportPkb> => {
        try {
            const getInspector : any = await MekanikRepository.detail( props.res, props.token ?? '', {
                tipe : 24,
                namaMekanik : props.data.final_inspector
            } )

            if (getInspector !== null) {
                if (getInspector.ack === 1) {
                    return ResponseImportPkb({
                        status : EnumErrorImportPKB.success,
                        data : getInspector.listOfFI[0]
                    })
                } else {
                    // create final inspector todo
                    // TODO: create final inspector
                }
                
            }

            return ResponseImportPkb({
                status : EnumErrorImportPKB.error,
                error : getInspector
            })
        }catch(e:any){
            return ResponseImportPkb({
                status : EnumErrorImportPKB.error,
                error : e
            })
        }
    }
}

export default new FinalInspectorPkb()