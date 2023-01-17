import { Request, Response } from "express";
import KendaraanRepository from "../../domain/repository/Kendaraan/KendaraanRepository";
import MasterDropDownRepository from "../../domain/repository/MasterData/DropDown/MasterDropDownRepository";
import ResponseResult from "../../core/response/ResponseResult";

class GetData {
    public getKendaraan = async ( req : Request, res : Response, element: any ) => {

        const checkKendaraan = await KendaraanRepository.get( res, element.token ?? '', {
                    action : 0,
                    noPolisi : element.no_polisi,
                    noMesin : element.no_mesin,
                    namaCustomer : "",
                    noRangka : element.no_rangka,
                    pageNumber : 1,
                    pageSize : 10,
                    totalRow : 0,
                    sortColumn : "ID",
                    sortDirection : 0
                } )

                // return ResponseResult.successGet( res, checkKendaraan  )

                return checkKendaraan?.listofKendaraan[0].id

                
                    // return ResponseResult.successGet( res, checkKendaraan )
                    console.log( "Ada")

                    // return ResponseResult.successGet(res, checkKendaraan?.listofKendaraan[0].id)
            
    }

    public getKendaraanStore = async (req : Request, res : Response, element: any) => {
            console.log( "Tidak Adata")

            // return ResponseResult.successGet( res, element.no_rangka )
            // const checkKendaraanx = await KendaraanRepository.get( res, element.token ?? '', {
            //         action : 0,
            //         noPolisi : element.no_polisi,
            //         noMesin : element.no_mesin,
            //         namaCustomer : "",
            //         noRangka : element.no_rangka,
            //         pageNumber : 1,
            //         pageSize : 10,
            //         totalRow : 0,
            //         sortColumn : "ID",
            //         sortDirection : 0
            //     } )

            //     // return ResponseResult.successGet( res, checkKendaraanx )
            //     if (checkKendaraanx?.ack === 1) {
            //         return checkKendaraanx?.listofKendaraan[0].id
            //     }
                    
            // return ResponseResult.successGet( res, "Tidak Ada" )
            const checkMasterData = await MasterDropDownRepository.masterDropDown( res, element.token ?? '', {
                listDropDown : [
                    {
                        tipe : 8,
                        label : "sample string 2",
                        nilai : "0"
                    }
                ],
                action : 1
            } )
            
            

            // return ResponseResult.successGet( res, checkMasterData )

            const checkMaster : any = await checkMasterData?.listDropDown.filter( ( item : any ) => item.label == element.nama_tipe_kendaraan )

            // return ResponseResult.successGet( res, checkMaster )

            const checkMasterDataWarna = await MasterDropDownRepository.masterDropDown( res, element.token ?? '', {
                listDropDown : [
                    {
                        tipe : 9,
                        label : "sample string 2",
                        nilai : checkMaster[ 0 ].nilai
                    }
                ],
                action : 1
            } )

            // return ResponseResult.successGet( res, element.tahunRakit )

            

            const checkWarna : any = await checkMasterDataWarna?.listDropDown.filter( ( item : any ) => item.label == element.warna )

            // return ResponseResult.successGet( res, checkWarna )

            const storeKendaraan = await KendaraanRepository.addKendaraan( res, element.token ?? '', {
                action : 0,
                id : 0,
                // idPelangan : checkCustomer?.listPelanggan[ 0 ].id ?? 0,
                // idPelanganSTNK : checkCustomer?.listPelanggan[ 0 ].id ?? 0
                idPelangan : element.idPelangan,
                idPelanganSTNK : element.idPelanganSTNK,
                noPolisi : element.no_polisi,
                noRangka : element.no_rangka,
                noMesin : element.no_mesin,
                warna : checkWarna[ 0 ].nilai,
                tipe : checkMaster[ 0 ].nilai,
                tahunRakit : element.tahunRakit + "-01-01T00:00:00+07:00",
                aktif : true,
                isUpdateQR : false
            } )

            // return ResponseResult.successGet(res, storeKendaraan)

            if (storeKendaraan?.ack === 0) {
                return "Gagal"
            }

            // return ResponseResult.successGet( res, element.no_mesin )
            // return
            // return Repo
            const checkDataKendaraanu = await KendaraanRepository.get( res, element.token ?? '', {
                action : 0,
                noPolisi : element.no_polisi,
                noMesin : element.no_mesin,
                namaCustomer : "",
                noRangka : element.no_rangka,
                pageNumber : 1,
                pageSize : 10,
                totalRow : 0,
                sortColumn : "ID",
                sortDirection : 0
            } )

            // return ResponseResult.successGet( res, checkDataKendaraan )

            return checkDataKendaraanu?.listofKendaraan[ 0 ].id ?? 1
        
    }
}

export default new GetData()