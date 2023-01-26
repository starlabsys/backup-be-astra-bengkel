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

            if ( checkJasaPkb?.ack == 1 ) {

                const jasa : any = ConvertModelResultJasaPkb.toModelResultJasaPkb( JSON.stringify( checkJasaPkb ) )

                const detailJasa = await JasaRepository.detailJasa( props.res, props.token ?? '', {
                    action : 1,
                    id : jasa.listofJasa[ 0 ].id, 
                })

                return ResponseImportPkb( {
                    status : EnumErrorImportPKB.success,
                    data : detailJasa
                } )
            }
            else {

                console.log("Data Jasa Tidak Ditemukan")
                return ResponseImportPkb({
                    status : EnumErrorImportPKB.error,
                    error : 'Data Jasa Tidak Ditemukan',
                })
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
