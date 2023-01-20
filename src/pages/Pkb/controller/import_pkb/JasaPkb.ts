import { ModelResultImportPkb } from "../../model/ModelResultImportPkb";
import { ModelParamPkb } from "../../model/ModelParamPkb";
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB";
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb";
import JasaRepository from "../../../../domain/repository/JasaRepository/JasaRepository";
import { ConvertModelResultJasaPkb } from "../../model/ModelResultJasaPkb";


class JasaPkb {
    public checkJasaPkb = async ( props : ModelParamPkb ) : Promise<ModelResultImportPkb> => {
        try {

            const checkJasaPkb = await JasaRepository.getJasa( props.res, props.token ?? '', {
                action : 0,
                kodeJasa : props.data.kode_jasa,
                namaJasa : '',
                pageNumber : 1,
                pageSize : 5,
                totalRow : 100,
                sortColumn : "ID",
                sortDirection : 0
            } )

            if ( checkJasaPkb !== null ) {

                const jasa : any = ConvertModelResultJasaPkb.toModelResultJasaPkb( JSON.stringify( checkJasaPkb ) )

                return ResponseImportPkb( {
                    status : EnumErrorImportPKB.success,
                    data : jasa.listofJasa[ 0 ]
                } )
            }
            else {
                //Todo:: Create Jasa Or Something
            }

            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : 'e',
            } )
        } catch ( e : any ) {
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : e,
            } )
        }
    }
}

export default new JasaPkb();
