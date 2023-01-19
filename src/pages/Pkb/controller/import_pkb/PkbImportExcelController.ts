import { ModelListExcel } from "../../model/ModelListExcel";
import e, { Request, Response } from "express";
import ResponseResult from "../../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../../utils/enum/EnumResponseCode";
import CustomerRepository from "../../../../domain/repository/CustomerRepository/CustomerRepository";
import Token from "../../../../utils/Token";
import ModelUsers from "../../../../db/models/ModelUsers";
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb";
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB";
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb";
import CustomerPkb from "./CustomerPkb";
import { ModelDetailCustomer } from "../../../../domain/models/Customer/ModelDetailCustomer";
import FinalInspectorPkb from "./FinalInspectorPkb";
import KendaraanPkb from "./KendaraanPkb";
import PitPkb from "./PitPkb";
import ServiceAdvisor from "./ServiceAdvisor";
import { ListOfPIT } from "../../../../domain/models/Pit/ModelPit";
import { ListOfKaryawanModel } from "../../../../domain/models/Mekanik/ModelMekanik";
import { ListofKendaraan } from "../../../../domain/models/Kendaraan/ModelGetListKendaraan";
import { InterfaceStorePkb } from "../../../../domain/repository/PkbRepository/interface/InterfaceStorePkb";
import PkbRepository from "../../../../domain/repository/PkbRepository/PkbRepository";


class PkbImportExcelController {


    public importExcel = async ( req : Request, res : Response ) => {
        const data : ModelListExcel [] = req.body;

        try {

            let datasend : InterfaceStorePkb[] = [];
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

                const checkToken = await Token.getTokenNew( req, res, respUser?.id );

                if ( checkToken ) {

                    const checkCustomer : ModelResultImportPkb = await CustomerPkb.checkCustomer( {
                        data : item,
                        token : checkToken,
                        res : res,
                    } )

                    const customer : ModelDetailCustomer = checkCustomer.data as ModelDetailCustomer;

                    const checkkendaraanpkb = await KendaraanPkb.checkKendaraan({
                        data : item,
                        token : checkToken,
                        res : res,
                    })

                    const kendaraanpkb : ListofKendaraan = checkkendaraanpkb.data as ListofKendaraan;

                    if (checkkendaraanpkb.message === EnumErrorImportPKB.error) {
                        return ResponseResult.error(res, {
                            statusCode : EnumResponseCode.BAD_REQUEST,
                            errorCode : "01",
                            message : checkkendaraanpkb.error,
                            data : null
                        })
                    }

                    const checkpitpkb = await PitPkb.checkPit({
                        data : item,
                        token : checkToken,
                        res : res,
                    })

                    const pitpkb : ListOfPIT = checkpitpkb.data as ListOfPIT;

                    if (checkpitpkb.message === EnumErrorImportPKB.error) {
                        return ResponseResult.error(res, {
                            statusCode : EnumResponseCode.BAD_REQUEST,
                            errorCode : "01",
                            message : checkpitpkb.error,
                            data : null
                        })
                        
                    }

                    const checkserviceadvisor = await ServiceAdvisor.checkServiceAdvisor({
                        data : item,
                        token : checkToken,
                        res : res,
                    })

                    const serviceadvisor : ListOfKaryawanModel = checkserviceadvisor.data as ListOfKaryawanModel;

                    if (checkserviceadvisor.message === EnumErrorImportPKB.error) {
                        return ResponseResult.error(res, {
                            statusCode : EnumResponseCode.BAD_REQUEST,
                            errorCode : "01",
                            message : checkserviceadvisor.error,
                            data : null
                        })
                        
                    }

                    const checkfinalinspector = await FinalInspectorPkb.checkFinalInspector({
                        data : item,
                        token : checkToken,
                        res : res,
                    })

                    const finalinspector : ListOfKaryawanModel = checkfinalinspector.data as ListOfKaryawanModel;

                    if (checkfinalinspector.message === EnumErrorImportPKB.error) {
                        return ResponseResult.error(res, {
                            statusCode : EnumResponseCode.BAD_REQUEST,
                            errorCode : "01",
                            message : checkfinalinspector.error,
                            data : null
                        })
                    }


                    let dataStore : InterfaceStorePkb = {
                            token: checkToken,
                            action : 0,
                            idPKB : 0,
                            noPKB : "",
                            tanggalSampai : item.tanggal,
                            activityCapacity : 0,
                            alamatPembawa : "",
                            alamatPembawaSaatIni: "",
                            alasanIngatServiceID : 4,
                            DataMotorkuX: "",
                            dealerSendiri: true,
                            handphonePembawa: "",
                            hubunganDgPemilikID: 7,
                            kmBerikutnya: item.kilometer_berikutnya,
                            kmSekarang: item.kilometer_sekarang,
                            namaPembawa: "",
                            noAntrian: "",
                            noPolisi: kendaraanpkb.noPolisi,
                            finalInspectorID: finalinspector.id.toString(),
                            gejala: item.gejala_analisa_service_advisor,
                            kotaPembawa: "",
                            idGudang: 0,
                            idPit: pitpkb.id,
                            indikatorBensin: 0,
                            isEngineNo: false,
                            isFrameNo: false,
                            isFirstLoad: 0,
                            isPKBHotline: false,
                            jamEstimasiSelesai: "",
                            jamKedatanganCustomer: "",
                            jamSelesai: "",
                            kecamatanPembawa: "",
                            keluhan: item.keluhan,
                            kodeAntrian: "",
                            listOfMaterialHotline: [],
                            // listOfMaterialPKB: ,
                            listOfPekerjaan: [],
                            noBuku: "",
                            noClaimC2: "",
                            noSTNK: item.no_stnk,
                            pageNumber: 0,
                            pageSize: 0,
                            partBekasDibawaKonsumen: false,
                            pergantianPart: "",
                            pkbRemove: 0,
                            refEquipmentID: kendaraanpkb.id,
                            refMechanicID: "",
                            serviceAdvisorID: serviceadvisor.id.toString(),
                            statusPKB: 0,
                            tipePKB: 1,
                            sortColumn: "",
                            sortDirection: 0,
                            tanggal: item.tanggal,
                            statusPencarianPKB: 0,
                            svPKBReturnID: 0,
                            tipeAntrian: item.tipe_antrian,
                            tipeComingCustomer: "Milik", //wajib
                            totalRow: 0,
                            uangMuka: 0,
                            jamMasuk: "",
                            jamProses: "",
                            latitude: "",
                            longitude: "",
                            pkbNo: "",

                        }

                    datasend.push(dataStore);
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

            if (datasend.length > 0) {

                datasend.forEach(async (item : InterfaceStorePkb) => {
                    await PkbRepository.storeData( res, item.token ?? '', item )  
                })

                return ResponseResult.successPost( res, "Data Berhasil Di Import" )



            }else{
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
