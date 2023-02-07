import e from "express";
import KendaraanRepository from "../../../../domain/repository/Kendaraan/KendaraanRepository";
import MasterDropDownRepository from "../../../../domain/repository/MasterData/DropDown/MasterDropDownRepository";
import { ModelParamPkb } from "../../model/ModelParamPkb";
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb";
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb";
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB";


class KendaraanPkb {
    

    public storeKendaraan = async ( props : ModelParamPkb ) : Promise<any> => {
        try {

            let messageError = "";
            const checkMasterData = await MasterDropDownRepository.masterDropDown( props.res, props.token ?? '', {
                listDropDown : [
                    {
                        tipe : 8,
                        label : "sample string 2",
                        nilai : "0"
                    }
                ],
                action : 1
            } )


            if (checkMasterData !== null) {

                const checkMaster : any = await checkMasterData?.listDropDown.filter( item => item.label.includes(props.data.nama_tipe_kendaraan) )

                // Check Medi
                // return ResponseImportPkb({
                //     status : EnumErrorImportPKB.success,
                //     data : checkMaster[0].nilai
                // })
                if (!checkMaster[0] !== null ) {

                    const checkMasterDataWarna = await MasterDropDownRepository.masterDropDown( props.res, props.token ?? '', {
                        listDropDown : [
                            {
                                tipe : 9,
                                label : "sample string 2",
                                nilai : checkMaster[ 0 ].nilai
                            }
                        ],
                        action : 1
                    } )

                    if (checkMasterDataWarna?.listDropDown !== null) {
                        
                        // return ResponseImportPkb( {
                        //     status : EnumErrorImportPKB.success,
                        //     data : checkMasterDataWarna?.listDropDown[0].label.toLocaleLowerCase()
                        // })
                        // const checkWarna : any = await checkMasterDataWarna?.listDropDown.filter( item => item.label.toLocaleLowerCase() === props.data.warna.toLocaleLowerCase() )

                        // return ResponseImportPkb( {
                        //     status : EnumErrorImportPKB.success,
                        //     data : checkWarna[0].nilai
                        // })
                        if (checkMasterDataWarna?.listDropDown[0] !== null) {
                            const storeKendaraan = await KendaraanRepository.addKendaraan( props.res, props.token ?? '', {
                                    action : 0,
                                    id : 0,
                                    // idPelangan : checkCustomer?.listPelanggan[ 0 ].id ?? 0,
                                    // idPelanganSTNK : checkCustomer?.listPelanggan[ 0 ].id ?? 0
                                    idPelangan : props.data.idPelanggan ?? 1,
                                    idPelanganSTNK : props.data.idPelanggan ?? 1,
                                    noPolisi : props.data.no_polisi,
                                    noRangka : props.data.no_rangka,
                                    noMesin : props.data.no_mesin,
                                    warna : checkMasterDataWarna?.listDropDown[0].nilai.toString() ?? "0",
                                    tipe : checkMaster[ 0 ].nilai,
                                    tahunRakit : props.data.tahun_rakit + "-01-01T00:00:00+07:00",
                                    aktif : true,
                                    isUpdateQR : false
                                } )

                                // return ResponseImportPkb({
                                //     status : EnumErrorImportPKB.success,
                                //     data : storeKendaraan
                                // })

                                if (storeKendaraan?.ack === 1) { 
                                    
                                    return this.checkKendaraan( props )
                                    
                                } else {
                                    return ResponseImportPkb( {
                                        status : EnumErrorImportPKB.error,
                                        error : storeKendaraan?.message
                                    } )
                                }

                                


                        }
                    }
                    
                }


            }

            // return ResponseImportPkb( {
            //     status : EnumErrorImportPKB.error,
            //     error : "Master Data Tidak Ditemukan"
            // } )

        } catch (e: any) {
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : e
            } )
        }
    }

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

                // return ResponseImportPkb({
                //     status : EnumErrorImportPKB.success,
                //     data : checkKendaraan
                // })

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

                       return this.storeKendaraan( props )

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