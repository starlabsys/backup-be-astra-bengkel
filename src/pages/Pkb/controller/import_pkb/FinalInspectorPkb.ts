import MekanikRepository from "../../../../domain/repository/Mekanik/MekanikRepository"
import { ModelParamPkb } from "../../model/ModelParamPkb"
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb"
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb"
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB"
import MasterDataMekanikRepository from "../../../../domain/repository/MasterData/mekanik/MasterDataMekanikRepository";


class FinalInspectorPkb {
    public checkFinalInspector = async ( props : ModelParamPkb ) : Promise<ModelResultImportPkb> => {
        try {
            const getInspector = await MasterDataMekanikRepository.getListMekanik( props.res, props.token ?? '', {
                tipe : 24,
                namaMekanik : ""
            } )

            if ( getInspector !== null ) {
                if ( getInspector.ack === 1 ) {
                    return ResponseImportPkb( {
                        status : EnumErrorImportPKB.success,
                        data : getInspector.listDropDown[ 0 ]
                    } )
                }
                else {
                    return ResponseImportPkb( {
                        status : EnumErrorImportPKB.error,
                        error : getInspector.message
                    } )
                    // create final inspector todo
                    // TODO: create final inspector
                }

            }

            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : "Error Get Final Inspector"
            } )
        } catch ( e : any ) {
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : "Error Check Final Inspector"
            } )
        }
    }
}

export default new FinalInspectorPkb()
