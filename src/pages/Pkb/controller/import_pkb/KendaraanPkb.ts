import KendaraanRepository from "../../../../domain/repository/Kendaraan/KendaraanRepository";
import { ModelParamPkb } from "../../model/ModelParamPkb";
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb";
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb";
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB";


class KendaraanPkb {
    
    public checkKendaraan = async ( props : ModelParamPkb ) : Promise<ModelResultImportPkb> => {
        // 
        try{
            const checkKendaraan = await KendaraanRepository.get( props.res, props.token ?? '', {
                    action : 0,
                    noPolisi : "",
                    noMesin : props.data.no_mesin,
                    namaCustomer : "",
                    noRangka : "",
                    pageNumber : 1,
                    pageSize : 10,
                    totalRow : 0,
                    sortColumn : "ID",
                    sortDirection : 0
                } )

                if( checkKendaraan !== null ){
                    if (checkKendaraan.ack === 1) {
                        // 
                        return ResponseImportPkb({
                            status : EnumErrorImportPKB.success,
                            data : checkKendaraan.listofKendaraan[0]
                        })
                    } else {
                        // create kendaraan todo
                        // TODO: create kendaraan
                    }
                }

                return ResponseImportPkb( {
                    status : EnumErrorImportPKB.error,
                    error : "Data Kendaraan Tidak Ditemukan"
                } )

        }catch(e:any){
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : e
            } )
        }
    }
}

export default new KendaraanPkb();