import { ModelParamPkb } from "../../model/ModelParamPkb";
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb";
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB";
import MasterDropDownRepository from "../../../../domain/repository/MasterData/DropDown/MasterDropDownRepository";
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb";
import { ModelGetAreaPkb } from "../../model/ModelGetAreaPkb";


class GetAreaPkb {
    public getArea = async ( props : ModelParamPkb ) : Promise<ModelResultImportPkb> => {
        try {
            const getAreaKab = await MasterDropDownRepository.masterDropDown( props.res, props.token ?? '', {
                listDropDown : [
                    {
                        "tipe" : 5,
                        "nilai" : "20",
                        "label" : "sample string 2"
                    }
                ]
            } )

            if ( getAreaKab !== null ) {

                const getAreaKec = await MasterDropDownRepository.masterDropDown( props.res, props.token ?? '', {
                    listDropDown : [
                        {
                            tipe : 6,
                            label : "sample string 2",
                            nilai : getAreaKab?.listDropDown[ 0 ]?.nilai ?? '',
                        }
                    ]
                } )

                if ( getAreaKec !== null ) {

                    const getAreaKelurahan = await MasterDropDownRepository.masterDropDown( props.res, props.token ?? '', {
                        listDropDown : [
                            {
                                tipe : 6,
                                label : "sample string 2",
                                nilai : getAreaKec?.listDropDown[ 0 ]?.nilai ?? '',
                            }
                        ]
                    } )

                    if ( getAreaKelurahan !== null ) {
                        return ResponseImportPkb( {
                            status : EnumErrorImportPKB.success,
                            data : {
                                kabupaten : getAreaKab?.listDropDown[ 0 ]?.nilai ?? '',
                                kecamatan : getAreaKec?.listDropDown[ 0 ]?.nilai ?? '',
                                kelurahan : getAreaKelurahan?.listDropDown[ 0 ]?.nilai ?? '',
                                zipCode : getAreaKelurahan?.listDropDown[ 0 ]?.additionalNilai ?? '',
                            } as ModelGetAreaPkb
                        } )
                    }
                }
            }
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : "Data Area Tidak Ditemukan"
            } )

        } catch ( e : any ) {
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : e,
            } )
        }
    }
}

export default new GetAreaPkb()
