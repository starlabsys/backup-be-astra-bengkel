import e from "express"
import PitRepository from "../../../../domain/repository/PitRepository/PitRepository"
import { ModelParamPkb } from "../../model/ModelParamPkb"
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb"
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb"
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB"

class PitPkb {


    public storePit = async ( props : ModelParamPkb ) : Promise<ModelResultImportPkb> => {

        // return ResponseImportPkb( {
        //     status : EnumErrorImportPKB.success,
        //     data : props.data.tipe_antrian.toUpperCase() + Math.floor( Math.random() * 100 ).toString()
        // } )
        try{
            const storePit = await PitRepository.storeData( props.res, props.token ?? '', {
                    action : 0,
                    id : 0,
                    kodePIT : props.data.tipe_antrian.toUpperCase() + Math.floor( Math.random() * 100 ).toString(),
                    tipePIT : props.data.tipe_antrian.toUpperCase(),
                    aktif : true
                } )

            if (storePit !== null) {

                return this.checkPit( props )
            }else {
                return ResponseImportPkb( {
                    status : EnumErrorImportPKB.error,
                    data : storePit
                } )
            }

        }catch(e:any){
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : e
            } )
        }
    }

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
                    return await this.storePit( props )
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