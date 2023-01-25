import { ModelListExcel } from "../../model/ModelListExcel";
import { Request, Response } from "express";
import ResponseResult from "../../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../../utils/enum/EnumResponseCode";
import Token from "../../../../utils/Token";
import ModelUsers from "../../../../db/models/ModelUsers";
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb";
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB";
import CustomerPkb from "./CustomerPkb";
import { ModelDetailCustomer } from "../../../../domain/models/Customer/ModelDetailCustomer";
import FinalInspectorPkb from "./FinalInspectorPkb";
import KendaraanPkb from "./KendaraanPkb";
import PitPkb from "./PitPkb";
import ServiceAdvisor from "./ServiceAdvisor";
import { ListOfPIT } from "../../../../domain/models/Pit/ModelPit";
import { ListofKendaraan } from "../../../../domain/models/Kendaraan/ModelGetListKendaraan";
import PkbRepository from "../../../../domain/repository/PkbRepository/PkbRepository";
import { ListDropDown } from "../../../../domain/models/DropDown/ModelListMekanikPKB";
import FormatDate from "../../../../utils/Format/FormatDate/FormatDate";
import JasaPkb from "./JasaPkb";
import { ModelResultDataJasaPkb } from "../../model/ModelResultDataJasaPkb";
import { InterfaceAddDataServices } from "../../model/ModelAddExcelPkb";
import { ModelProsesPkb } from "../../model/ModelProsesPkb";
import MekanikRepository from "../../../../domain/repository/Mekanik/MekanikRepository";


class PkbImportExcelController {


    public importExcel = async ( req : Request, res : Response ) => {
        const data : ModelListExcel [] = req.body;

        try {

            let dataSend : InterfaceAddDataServices[] = [];


            for ( const item of data ) {
                const respUser = await ModelUsers.findOne( {
                    where : {
                        username : item.username
                    }
                } )

                if ( !respUser ) {
                    return ResponseResult.error( res, {
                        statusCode : EnumResponseCode.BAD_REQUEST,
                        errorCode : "01",
                        message : "User tidak Ditemukan",
                        data : null
                    } )
                }

                const checkToken = await Token.getTokenNew( req, res, Number( respUser?.id?.toString() ) ?? Number( 0 ).toString() );

                if ( checkToken ) {

                    const checkCustomer : ModelResultImportPkb = await CustomerPkb.checkCustomer( {
                        data : item,
                        token : checkToken,
                        res : res,
                    } )

                    const customer : ModelDetailCustomer = checkCustomer.data as ModelDetailCustomer;

                    item.idPelanggan = customer.id

                    const checkKendaraanPkb = await KendaraanPkb.checkKendaraan( {
                        data : item,
                        token : checkToken,
                        res : res,
                    } )

                    // return ResponseResult.successGet(res, checkKendaraanPkb).


                    const kendaraanPkb : ListofKendaraan = checkKendaraanPkb.data as ListofKendaraan;

                    if ( checkKendaraanPkb.message === EnumErrorImportPKB.error ) {
                        return ResponseResult.error( res, {
                            statusCode : EnumResponseCode.BAD_REQUEST,
                            errorCode : "01",
                            message : checkKendaraanPkb.error,
                            data : null
                        } )
                    }

                    const checkPitPkb = await PitPkb.checkPit( {
                        data : item,
                        token : checkToken,
                        res : res,
                    } )


                    const pitPkb : ListOfPIT = checkPitPkb.data as ListOfPIT;

                    if ( checkPitPkb.message === EnumErrorImportPKB.error ) {
                        return ResponseResult.error( res, {
                            statusCode : EnumResponseCode.BAD_REQUEST,
                            errorCode : "01",
                            message : checkPitPkb.error,
                            data : null
                        } )

                    }

                    const checkServiceAdvisor = await ServiceAdvisor.checkServiceAdvisor( {
                        data : item,
                        token : checkToken,
                        res : res,
                    } )

                    const serviceAdvisor : ListDropDown = checkServiceAdvisor.data as ListDropDown;

                    if ( checkServiceAdvisor.message === EnumErrorImportPKB.error ) {
                        return ResponseResult.error( res, {
                            statusCode : EnumResponseCode.BAD_REQUEST,
                            errorCode : "01",
                            message : checkServiceAdvisor.error,
                            data : null
                        } )

                    }

                    const checkFinalInspector = await FinalInspectorPkb.checkFinalInspector( {
                        data : item,
                        token : checkToken,
                        res : res,
                    } )
                    // ModelListMekanikPKB.listDropDown
                    const finalInspector : ListDropDown = checkFinalInspector.data as ListDropDown;

                    if ( checkFinalInspector.message === EnumErrorImportPKB.error ) {
                        return ResponseResult.error( res, {
                            statusCode : EnumResponseCode.BAD_REQUEST,
                            errorCode : "01",
                            message : checkFinalInspector.error,
                            data : null
                        } )
                    }

                    const checkJasa = await JasaPkb.checkJasaPkb( {
                        data : item,
                        token : checkToken,
                        res : res,
                    } )

                    // return ResponseResult.successGet( res, checkJasa )

                    const jasaPkb : ModelResultDataJasaPkb | undefined = checkJasa.data as ModelResultDataJasaPkb;

                    // return ResponseResult.successGet( res, FormatDate.dateSend( item.tanggal ) )
                    const nilaiDiskon = jasaPkb.nilaiDiskon ?? 0;
                    const persentaseDiskon = jasaPkb.persentaseDiskon ?? 0;
                    const pajakJual = jasaPkb.pajakJual ?? 0;
                    const hargaJual = jasaPkb.hargaJual ?? 0;

                    let dataStore : InterfaceAddDataServices = {
                        token : checkToken,
                        action : 0,
                        idPKB : 0,
                        // tanggalSampai : FormatDate.dateSend( item.tanggal ),
                        activityCapacity : 3,
                        alamatPembawa : item.alamat_ktp_pembawa,
                        alamatPembawaSaatIni : item.alamat_ktp_pembawa,
                        alasanIngatServiceID : 4,
                        DataMotorkuX : {
                            VoucherType : 0,
                            VoucherValue : 0,
                        },
                        dealerSendiri : true,
                        handphonePembawa : item.handphone_pembawa,
                        hubunganDgPemilikID : 7,
                        kmBerikutnya : item.kilometer_berikutnya,
                        kmSekarang : item.kilometer_sekarang,
                        namaPembawa : item.nama_pembawa,
                        noAntrian : "",
                        // noPolisi : kendaraanPkb.noPolisi,
                        finalInspectorID : finalInspector.nilai,
                        gejala : item.gejala_analisa_service_advisor,
                        kotaPembawa : item.kota_pembawa,
                        idGudang : "",
                        idPit : 0,
                        indikatorBensin : 0,
                        isEngineNo : false,
                        isFrameNo : false,
                        // isFirstLoad : 0,
                        isPKBHotline : false,
                        jamEstimasiSelesai : FormatDate.dateSend( item.tanggal ),
                        jamKedatanganCustomer : FormatDate.dateSend( item.jam_kedatangan_customer ),
                        jamSelesai : "",
                        kecamatanPembawa : item.kecamatan_pembawa,
                        keluhan : item.keluhan,
                        kodeAntrian : "R",
                        listOfMaterialHotline : [],
                        // listOfMaterialPKB: ,
                        listOfPekerjaan : [
                            {
                                guid : '',
                                pkbID : 0,
                                pkbPekerjaanID : 0,
                                itemNo : 0,
                                refJobID : jasaPkb.id ?? 0,
                                nilaiDiskon : nilaiDiskon,
                                nilaiDiskonJasa : jasaPkb.nilaiDiskon ?? 0,
                                persentaseDiskon : persentaseDiskon,
                                persentaseDiskonJasa : jasaPkb.persentaseDiskon ?? 0,
                                totalJasa : persentaseDiskon + nilaiDiskon + pajakJual + hargaJual,
                                pajakJasa : pajakJual,
                                hargaPekerjaan : hargaJual,
                                namaPekerjaan : jasaPkb.namaJasa ?? '',
                                isOPL : false,
                                labelisOPL : 'Tidak',
                                listOfMaterial : [],
                                // listSparepartTable.map( ( valueData ) : InterfaceListSparePartPKB => {
                                //     if ( valueData.pekerjaanID === item.idJasa ) {
                                //         return valueData
                                //     }
                                //     return {} as InterfaceListSparePartPKB
                                // } ),
                                listOfMaterialHotline : [],
                                kodeJasa : jasaPkb.kodeJasa,
                                idJasa : jasaPkb.id,
                                isShowDelete : true,
                                isEditable : true,
                                isFreeService : jasaPkb.isFreeService,
                                flatRate : jasaPkb.flatRate,
                                markUpJasa : 0,
                                vendorID : "",
                                noClaimC2 : '',
                                noBuku : '',
                                isAdditionalPekerjaan : 0, //ubah
                            }
                        ],
                        noBuku : "",
                        noClaimC2 : "",
                        noSTNK : item.no_stnk,
                        // pageNumber : 0,
                        // pageSize : 0,
                        partBekasDibawaKonsumen : false,
                        pergantianPart : false,
                        pkbRemove : {
                            listRemoveMaterial : [],
                            listRemovePekerjaan : [],
                        },
                        refEquipmentID : kendaraanPkb.id,
                        refMechanicID : "",
                        serviceAdvisorID : serviceAdvisor.nilai.toString(),
                        statusPKB : 0,
                        tipePKB : 1,
                        // sortColumn : "",
                        // sortDirection : 0,
                        tanggal : FormatDate.dateSend( item.tanggal ),
                        // statusPencarianPKB : 0,
                        svPKBReturnID : 0,
                        tipeAntrian : item.tipe_antrian,
                        tipeComingCustomer : "Milik", //wajib
                        // totalRow : 0,
                        uangMuka : 0,
                        jamMasuk : FormatDate.dateSend( item.tanggal ),
                        jamProses : "",
                        latitude : "",
                        longitude : "",
                        pkbNo : "",

                    }

                    // return ResponseResult.successGet( res, dataStore )

                    console.log( dataStore );
                    dataSend.push( dataStore );
                }
                else {
                    return ResponseResult.error( res, {
                        statusCode : EnumResponseCode.UNAUTHORIZED,
                        errorCode : '01',
                        message : 'Credential Login Tidak Valid',
                        data : null,
                    } )
                }


            }

            let statusSend : string[] = []
            let idPkb : ModelProsesPkb[] = []

            let messageResp : string = ''


            if ( dataSend.length > 0 ) {

                for ( const item of dataSend ) {
                    const respStore = await PkbRepository.storeDataExcel( res, item.token ?? '', item )
                                                         .then( async ( result ) => {
                                                             if ( result !== null ) {
                                                                 if ( result?.ack !== 1 ) {
                                                                     statusSend.push( result?.message ?? '' )
                                                                 }
                                                                 else {
                                                                     idPkb.push( {
                                                                         idpkb : Number( result?.pkbID ),
                                                                         token : item.token ?? '',
                                                                         tanggal : item.tanggal,
                                                                         refMechanicId : item.refMechanicID,
                                                                         ack : '1'
                                                                     } )
                                                                 }
                                                             }
                                                         } )


                    // return ResponseResult.successGet( res, respStore)
                }

                console.log( 'idpkb', idPkb )
                
                if ( idPkb[0].ack === '1' ) {
                    for ( const item of idPkb ) {

                        const mechanicID = await MekanikRepository.dropdown( res, item.token ?? '', {
                            tipe : 13,
                            namaMekanik : ""
                        } )

                        if (mechanicID !== null) {
                            
                            console.log('mechanicID', mechanicID?.listDropDown[0].nilai)
                            const respPrint = await PkbRepository.prosesPKB( res, item.token ?? '', {
                                id : item.idpkb,
                                action : 1,
                                waktu : FormatDate.dateSend( item.tanggal ),
                                refMechanicId : mechanicID?.listDropDown[ 0 ].nilai.toString() ?? "1",
                                saran : "",
                                durasiPengerjaanPKB : "00:00:00:00",
                                isOverdue : 1,
                                etaOverdue : 158.88,
                                alasanPauseId : ""
                            } )

                            // console.log( 'respPrint', respPrint )
                            // return ResponseResult.successGet( res, "Resprint"+respPrint )

                            if ( respPrint?.ack === 1 ) {
                                const respSelesai = await PkbRepository.prosesPKB( res, item.token ?? '', {
                                    id : item.idpkb,
                                    action : 2,
                                    waktu : FormatDate.dateSend( item.tanggal ),
                                    refMechanicId : mechanicID?.listDropDown[ 0 ].nilai.toString() ?? "1",
                                    saran : "",
                                    durasiPengerjaanPKB : "00:00:00:00",
                                    isOverdue : 1,
                                    etaOverdue : 158.88,
                                    alasanPauseId : ""
                                } )

                                messageResp = respSelesai?.message ?? ''

                                console.log( 'respSelesai', respSelesai )

                                // return ResponseResult.successGet( res, respSelesai)
                            }

                        }
                    }
                }

                if ( statusSend.length > 0 ) {
                    return ResponseResult.successPost( res, JSON.stringify( statusSend ) )
                }
                else {
                    return ResponseResult.successPost( res, 'Success Import Excel' )
                }
                // statusSend.length >
                // 0 ?


            }
            else {
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : '01',
                    message : 'Data Tidak Valid, Silahkan Cek Kembali Data Anda',
                    data : null,
                } )

            }


        } catch ( e : any ) {
            return ResponseResult.error( res, {
                errorCode : '01',
                statusCode : EnumResponseCode.FORBIDDEN,
                message : e,
                data : null,
            } );
        }
    }


}

export default new PkbImportExcelController();
