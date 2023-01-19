import PitRepository from "../../../../domain/repository/PitRepository/PitRepository"
import { ModelParamPkb } from "../../model/ModelParamPkb"
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb"
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb"
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB"

class PitPkb {
    public checkPit = async ( props : ModelParamPkb ) : Promise<ModelResultImportPkb> => {
        try{
            const getPit = await PitRepository.getData( props.res, props.token ?? '', {
                kodePIT : "",
                tipePIT : props.data.tipe_antrian
            } )

            if (getPit !== null) {
                if (getPit.ack === 1) {
                    return ResponseImportPkb( {
                        status : EnumErrorImportPKB.success,
                        data : getPit.listOfPIT[0]
                    } )
                } else {
                    // create pit todo
                    // TODO: create pit
                }
                
            }

            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                data : getPit
            } )

        }catch(e:any){
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : e
            } )
        }
    }
}

export default new PitPkb()