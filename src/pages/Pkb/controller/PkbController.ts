import e, { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";

import PitMekanikRepository from "../../../domain/repository/PitMekanikRepository/PitMekanikRepository";
// import { InterfaceGetPitMekanik } from
// "../../../domain/repository/PitMekanikRepository/interface/InterfaceGetPitMekanik"; import {
// InterfaceStorePitMekanik } from
// "../../../domain/repository/PitMekanikRepository/interface/InterfaceStorePitMekanik";
import { InterfaceGetPkb } from "../../../domain/repository/PkbRepository/interface/InterfaceGetPkb";
import PkbRepository from "../../../domain/repository/PkbRepository/PkbRepository";
import { InterfaceStorePkb } from "../../../domain/repository/PkbRepository/interface/InterfaceStorePkb";
import { InterfaceDetailPkb } from "../../../domain/repository/PkbRepository/interface/InterfaceDetailPkb";
import KendaraanRepository from "../../../domain/repository/Kendaraan/KendaraanRepository";
import JasaRepository from "../../../domain/repository/JasaRepository/JasaRepository";
import { InterfaceGetJasa } from "../../../domain/repository/JasaRepository/interface/InterfaceGetJasa";
import { InterfaceAddJasa } from "../../../domain/repository/JasaRepository/interface/InterfaceAddJasa";
import MasterDropDownRepository from "../../../domain/repository/MasterData/DropDown/MasterDropDownRepository";
import CustomerRepository from "../../../domain/repository/CustomerRepository/CustomerRepository";
import AreaRepository from "../../../domain/repository/MasterData/Area/AreaRepository";
import MekanikRepository from "../../../domain/repository/Mekanik/MekanikRepository";
import PitRepository from "../../../domain/repository/PitRepository/PitRepository";
import { InterfaceDataUser } from "../../../utils/GetAllUser/Interface/InterfaceDataUser";
import GetUser from "../../../utils/GetAllUser/GetUser";
import { ModelOfPKB } from "../../../domain/models/Pkb/ModelPkb";
import { InterfaceProsesPKB } from "../../../domain/repository/PkbRepository/interface/InterfaceProsesPKB";
import ModelUsers from "../../../db/models/ModelUsers";


class PkbController {
    public getPkb = async ( req : Request, res : Response ) => {
        try {

            if ( req.app.locals.credential.role == 'admin' ) {

                const data : InterfaceGetPkb = req.body;

                const user : InterfaceDataUser[] = await GetUser.getUser(req, res)

                let arr_data : ModelOfPKB = {
                    ack : 0,
                    message : '',
                    listOfPKB : []
                }

                for( const element of user){
                    const resp = await PkbRepository.getData( res, element.token ?? '', data );

                    if (resp !== null) {
                        if (resp.ack === 1) {
                            arr_data.listOfPKB.push(...resp.listOfPKB)
                            arr_data.ack = resp.ack
                            arr_data.message = resp.message
                        }
                    }
                }

                return ResponseResult.successGet( res, arr_data );

            }
            else {

                const data : InterfaceGetPkb = req.body;
                const token = await Token.get( req, res );

                const resp = await PkbRepository.getData( res, token ?? '', data );

                if ( resp !== null ) {
                    return ResponseResult.successGet( res, resp );
                }

                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : "01",
                    message : "Internal Error",
                    data : null
                } )
            }

        } catch ( error : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                message : error.message,
                data : null
            } )
        }
    }

    public storePkb = async ( req : Request, res : Response ) => {
        try {

            const data : InterfaceStorePkb = req.body
            // console.log(data);

            const token = await Token.get( req, res )

            const resp = await PkbRepository.storeData( res, token ?? '', data )

            if ( resp !== null ) {

                // console.log(resp.pkbID)
                // if ( resp.pkbID ) {
                //
                //     return ResponseResult.error( res, {
                //         statusCode : EnumResponseCode.BAD_REQUEST,
                //         errorCode : "01",
                //         message : resp.message,
                //         data : null
                //     } )
                //
                // }

                if ( resp?.ack === 1 ) {
                    return ResponseResult.successPost( res, resp.message )
                }
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : "01",
                    message : resp.message,
                    data : null,
                } )
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : "01",
                message : "Internal Error",
                data : null
            } )
        } catch ( error : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                message : error.message,
                data : null
            } )
        }
    }

    public detailPkb = async ( req : Request, res : Response ) => {
        try {
            const data : InterfaceDetailPkb = req.body
            const token = await Token.get( req, res )

            const resp = await PkbRepository.detailData( res, token ?? '', data )

            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp )
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : "01",
                message : "Internal Error",
                data : null
            } )
        } catch ( error : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                message : error.message,
                data : null
            } )
        }
    }

    public importPkb = async ( req : Request, res : Response ) => {
        // if (req.app.locals.credential.role === 'admin') {
        const data = req.body;
        // return ResponseResult.successPost(res, data)
        // const user_id = req.params.user_id;

        // const token = await Token.getDetail( req, res, user_id );

        // return ResponseResult.successGet(res, token)
        try {

            for ( const element of data) {
                const respUser = await ModelUsers.findOne({
                    where :{
                        username : element.username
                    }
                })

                // console.log(respUser)

                // return ResponseResult.successGet(res, respUser)

                if (!respUser) {
                    return ResponseResult.error( res, {
                        statusCode : EnumResponseCode.BAD_REQUEST,
                        errorCode : "01",
                        message : "User tidak Ditemukan",
                        data : null
                    })
                }

            }

            for ( const element of data ) {

                const respUser = await ModelUsers.findOne({
                    where :{
                        username : element.username
                    }
                })

                const token = await Token.getTokenNew( req, res, respUser?.id );

                // console.log(token)
                // return ResponseResult.successGet(res, token)
                // const token = await Token.getDetail( req, res, respUser?.id );
                // return ResponseResult.successGet(res, token)

                const split = element.tanggal.split( " " )

                // return ResponseResult.successGet(res, split)
                const date = split[ 0 ]
                // return ResponseResult.successGet(res, date)
                const tanggal = date.split( "/" )
                const fixtanggal = tanggal[ 2 ] + "-" + tanggal[ 1 ] + "-" + tanggal[ 0 ]

                // retur
                const dataStore : any = {
                    action : 0,
                    idPKB : 0,
                    pkbNo : "",
                    refEquipmentID : "", //idkendaraan
                    statusPKB : 0,
                    tipePKB : 1,
                    noAntrian : "",
                    kmSekarang : element.kilometer_sekarang,
                    kmBerikutnya : element.kilometer_berikutnya,
                    namaPembawa : "", //datanama
                    alamatPembawa : "", //datanama
                    alamatPembawaSaatIni : "", //datanama
                    kotaPembawa : "", //datanama
                    handphonePembawa : "", //datanama
                    hubunganDgPemilikID : 7,
                    alasanIngatServiceID : 4,
                    dealerSendiri : true,
                    keluhan : element.keluhan,
                    gejala : element.gejala == null ? "" : element.gejala,
                    pergantianPart : "false",
                    partBekasDibawaKonsumen : false,
                    refMechanicID : "5", //mechanicID
                    serviceAdvisorID : "1", //SAID
                    finalInspectorID : "1", //SAID
                    jamMasuk : fixtanggal + "T11:35:19+07:00",
                    jamProses : "",
                    jamSelesai : "",
                    uangMuka : 0,
                    idGudang : 0,
                    idPit : 0,
                    listOfPekerjaan : [], //,
                    listOfMaterialHotline : [],
                    tanggal : fixtanggal + "T11:35:19+07:00",
                    latitude : "",
                    longitude : "",
                    noSTNK : "", //datakendaraan
                    indikatorBensin : 0,
                    svPKBReturnID : 0,
                    kodeAntrian : "R",
                    tipeAntrian : "R",
                    activityCapacity : 3,
                    kecamatanPembawa : "",
                    pkbRemove : {
                        "listRemovePekerjaan" : [],
                        "listRemoveMaterial" : []
                    },
                    tipeComingCustomer : "Milik",
                    isEngineNo : false,
                    isFrameNo : false,
                    isPKBHotline : false,
                    jamEstimasiSelesai : fixtanggal + "T02:00:00+07:00",
                    jamKedatanganCustomer : fixtanggal + "T02:00:00+07:00",
                    noClaimC2 : "",
                    noBuku : "",
                    DataMotorkuX : {
                        "VoucherType" : 0,
                        "VoucherValue" : 0
                    }
                }

                // return ResponseResult.successGet(res, dataStore)
                // Get Jasa Detail

                // return

                const checkJasa : any = await JasaRepository.getJasa( res, token ?? '', {
                    action : 0,
                    kodeJasa : element.kode_jasa,
                    namaJasa : "",
                    pageNumber : 1,
                    pageSize : 10,
                    sortColumn : "ID",
                    sortDirection : 0,
                    totalRow : 1000,
                } )

                // return ResponseResult.successGet(res, checkJasa)

                if ( checkJasa.ack === 1 ) {
                    // return ResponseResult.successGet(res, "satu")
                    const dataJasa : any = {
                        guid : "5fd4da87",
                        pkbID : 0,
                        pkbPekerjaanID : 0,
                        itemNo : 10,
                        refJobID : checkJasa.listofJasa[ 0 ].id ?? "",
                        nilaiDiskon : checkJasa.listofJasa[ 0 ].nilaiDiskon ?? 0,
                        nilaiDiskonJasa : checkJasa.listofJasa[ 0 ].nilaiDiskon ?? 0,
                        persentaseDiskon : 0,
                        persentaseDiskonJasa : checkJasa.listofJasa[ 0 ].persentaseDiskon ?? 0,
                        totalJasa : checkJasa.listofJasa[ 0 ].hargaJual ?? 0,
                        pajakJasa : checkJasa.listofJasa[ 0 ].pajakJual ?? 0,
                        hargaPekerjaan : checkJasa.listofJasa[ 0 ].hargaJual ?? 0,
                        namaPekerjaan : checkJasa.listofJasa[ 0 ].namaJasa ?? "",
                        isOPL : false,
                        labelisOPL : "Tidak",
                        listOfMaterial : [],
                        listOfMaterialHotline : [],
                        kodeJasa : checkJasa.listofJasa[ 0 ].kodeJasa + ' - ' + checkJasa.listofJasa[ 0 ].namaJasa,
                        idJasa : 240,
                        isShowDelete : true,
                        isEditable : true,
                        isFreeService : false,
                        markUpJasa : 0,
                        vendorID : "",
                        flatRate : 45,
                        noClaimC2 : "",
                        noBuku : "",
                        isAdditionalPekerjaan : 0
                    }

                    dataStore.listOfPekerjaan = [ dataJasa ]

                    // return ResponseResult.successGet(res, dataJasa)
                }
                else {
                    // return ResponseResult.successGet(res, "nol")

                    const respPost : any = await JasaRepository.putJasa( res, token ?? '', {
                        action : 0,
                        id : 0,
                        kodeJasa : element.kode_jasa,
                        namaJasa : "Jasa " + element.kode_jasa,
                        grupJasa : "7",
                        subGrup : "",
                        hargaJual : element.hargaJual ?? 0,
                        pajakJual : 0,
                        oumKerja : 1,
                        catatan : "",
                        tipeKomisi : 0,
                        satuanKomisi : "",
                        nilaiKomisi : 0,
                        aktif : true,
                        waktuKerja : 2,
                        listSparePart : [],
                        kategoriPekerjaanID : 0
                    } )

                    // return ResponseResult.successPost(res, respPost)

                    const checkStoreJasa : any = await JasaRepository.getJasa( res, token ?? '', {
                        action : 0,
                        kodeJasa : element.kode_jasa,
                        namaJasa : "",
                        pageNumber : 1,
                        pageSize : 10,
                        sortColumn : "ID",
                        sortDirection : 0,
                        totalRow : 1000,
                    } )

                    // return ResponseResult.successGet(res, checkStoreJasa)


                    const dataJasa : any = {
                        guid : "5fd4da87",
                        pkbID : 0,
                        pkbPekerjaanID : 0,
                        itemNo : 10,
                        refJobID : checkStoreJasa.listofJasa[ 0 ].id,
                        nilaiDiskon : 0,
                        nilaiDiskonJasa : checkStoreJasa.listofJasa[ 0 ].nilaiDiskon,
                        persentaseDiskon : 0,
                        persentaseDiskonJasa : checkStoreJasa.listofJasa[ 0 ].persentaseDiskon,
                        totalJasa : checkStoreJasa.listofJasa[ 0 ].hargaJual,
                        pajakJasa : checkStoreJasa.listofJasa[ 0 ].pajakJual,
                        hargaPekerjaan : checkStoreJasa.listofJasa[ 0 ].hargaJual,
                        namaPekerjaan : checkStoreJasa.listofJasa[ 0 ].namaJasa,
                        isOPL : false,
                        labelisOPL : "Tidak",
                        listOfMaterial : [],
                        listOfMaterialHotline : [],
                        kodeJasa : checkStoreJasa.listofJasa[ 0 ].kodeJasa + ' - ' + checkStoreJasa.listofJasa[ 0 ].namaJasa,
                        idJasa : 240,
                        isShowDelete : true,
                        isEditable : true,
                        isFreeService : false,
                        markUpJasa : 0,
                        vendorID : "",
                        flatRate : 45,
                        noClaimC2 : "",
                        noBuku : "",
                        isAdditionalPekerjaan : 0
                    }

                    dataStore.listOfPekerjaan = [ dataJasa ]
                }

                // Check Customer

                const checkCustomer = await CustomerRepository.get( res, token ?? '', {
                    action : 0,
                    kodePelanggan : "",
                    alamatPelanggan : "",
                    namaPelanggan : element.pemilik,
                    kotaPelanggan : "",
                    kecamatanPelanggan : "",
                    kelurahanPelanggan : "",
                    pageNumber : 1,
                    pageSize : 10,
                    totalRow : 100,
                    sortColumn : "ID",
                    sortDirection : 0
                } )


                // return ResponseResult.successGet(res, checkCustomer)

                if ( checkCustomer?.ack == 1 ) {
                    const detailCustomer = await CustomerRepository.detail( res, token ?? '', {
                        action : 1,
                        id : checkCustomer?.listPelanggan[ 0 ].id ?? 1
                    } )

                    dataStore.namaPembawa = detailCustomer?.namaCustomer
                    dataStore.alamatPembawa = detailCustomer?.alamat
                    dataStore.alamatPembawaSaatIni = detailCustomer?.alamat
                    dataStore.kotaPembawa = detailCustomer?.kabupaten
                    dataStore.handphonePembawa = detailCustomer?.noHp
                    // dataStore.title = detailCustomer?.title
                }
                else {

                    const getArea = await AreaRepository.getListAreaKalBar( res, token ?? "", {
                        kabupaten : element.kotakabupaten,
                        kecamatan : element.kecamatan,
                        kelurahan : "",
                        zipCode : ""
                    } )

                    // return ResponseResult.successGet(res, getArea)

                    let postDataCustomer = await CustomerRepository.add( res, token ?? '', {
                        action : 0,
                        id : 0,
                        isUpdateQR : false,
                        kodeCustomer : "",
                        title : 'Mr.',
                        namaCustomer : element.nama,
                        noktp : element.no_ktp,
                        noPassport : "",
                        alamat : element.alamat,
                        gender : element.title == "Tuan" ? "L" : "P",
                        provinsi : element.provinsi,
                        kabupaten : getArea?.listOfArea[ 0 ].kabupaten ?? '',
                        tanggalUlangTahun : "",
                        kecamatan : getArea?.listOfArea[ 0 ].kecamatan ?? '',
                        kelurahan : getArea?.listOfArea[ 0 ].kelurahan ?? '',
                        zipCode : getArea?.listOfArea[ 0 ].zipCode ?? '',
                        noTelepon : "",
                        noHp : element.no_hp_1,
                        noFaks : "",
                        email : "",
                        facebook : "",
                        twitter : "",
                        instagram : "",
                        namaKontakPerson : "",
                        noteleponKontakPerson : "",
                        noHpKontakPerson : "",
                        emailKontakPerson : "",
                        jabatanKontakPerson : "",
                        salesmanID : "",
                        website : "",
                        catatan : "",
                        top : 0,
                        kodeGrupDiskonPelanggan : "",
                        agama : "",
                        npwp : "",
                        nppkp : "",
                        alamatPajak : "",
                        alamatKirim : "",
                        up : "",
                        noTeleponAlamatKirim : "",
                        limitKredit : "",
                        aktif : true,
                        jabatanCustomerID : 0
                    } )

                    // return Re
                    // return ResponseResult.successGet( res, postDataCustomer )
                }

                // return ResponseResult.successGet( res, dataStore )
                // console.log(postDataCustomer)


                // Check Kendaraan
                const checkKendaraan = await KendaraanRepository.get( res, token ?? '', {
                    action : 0,
                    noPolisi : "",
                    noMesin : element.no_mesin,
                    namaCustomer : "",
                    noRangka : "",
                    pageNumber : 1,
                    pageSize : 10,
                    totalRow : 0,
                    sortColumn : "ID",
                    sortDirection : 0
                } )

                // return ResponseResult.successGet( res, checkKendaraan )

                if ( checkKendaraan?.ack == 1 ) {

                    dataStore.refEquipmentID = checkKendaraan?.listofKendaraan[ 0 ].id ?? 0
                    dataStore.noSTNK = element.no_stnk

                    // return ResponseResult.successGet( res, dataStore )
                }
                else {

                    // return ResponseResult.successGet( res, element.no_mesin )

                    const checkMasterData = await MasterDropDownRepository.masterDropDown( res, token ?? '', {
                        listDropDown : [
                            {
                                tipe : 8,
                                label : "sample string 2",
                                nilai : "0"
                            }
                        ],
                        action : 1
                    } )

                    const checkMaster : any = await checkMasterData?.listDropDown.filter( ( item : any ) => item.label == element.nama_tipe_kendaraan )

                    const checkMasterDataWarna = await MasterDropDownRepository.masterDropDown( res, token ?? '', {
                        listDropDown : [
                            {
                                tipe : 9,
                                label : "sample string 2",
                                nilai : checkMaster[ 0 ].nilai
                            }
                        ],
                        action : 1
                    } )

                    const checkWarna : any = await checkMasterDataWarna?.listDropDown.filter( ( item : any ) => item.label == element.warna )

                    // return ResponseResult.successGet( res, checkWarna )

                    const storeKendaraan = await KendaraanRepository.addKendaraan( res, token ?? '', {
                        action : 0,
                        id : 0,
                        idPelangan : checkCustomer?.listPelanggan[ 0 ].id ?? 0,
                        idPelanganSTNK : checkCustomer?.listPelanggan[ 0 ].id ?? 0,
                        noPolisi : element.no_polisi,
                        noRangka : element.no_rangka,
                        noMesin : element.no_mesin,
                        warna : checkWarna[ 0 ].nilai,
                        tipe : checkMaster[ 0 ].nilai,
                        tahunRakit : element.tahun_rakit + "-01-01T00:00:00+07:00",
                        aktif : true,
                        isUpdateQR : false
                    } )

                    // return ResponseResult.successGet(res, storeKendaraan)

                    // return ResponseResult.successGet( res, element.no_mesin )
                    // return
                    // return Repo
                    const checkDataKendaraan = await KendaraanRepository.get( res, token ?? '', {
                        action : 0,
                        noPolisi : "",
                        noMesin : element.no_mesin,
                        namaCustomer : "",
                        noRangka : "",
                        pageNumber : 1,
                        pageSize : 10,
                        totalRow : 0,
                        sortColumn : "ID",
                        sortDirection : 0
                    } )


                    // return ResponseResult.successGet(res, checkDataKendaraan)
                    dataStore.refEquipmentID = checkDataKendaraan?.listofKendaraan[ 0 ].id ?? 1
                    dataStore.noSTNK = element.no_stnk

                }

                // PIT

                const getPit = await PitRepository.getData( res, token ?? '', {
                    kodePIT : "",
                    tipePIT : element.tipe_antrian
                } )

                if ( getPit?.ack === 1 ) {
                    // dataStore.
                }
                else {
                    const storePit = await PitRepository.storeData( res, token ?? '', {
                        action : 0,
                        id : 0,
                        kodePIT : "",
                        tipePIT : element.tipe_antrian,
                        aktif : true
                    } )
                }


                // return ResponseResult.successGet(res, getPit)
                // Check Mekanik


                // const getMekanik : any = await MekanikRepository.detail(res, token ?? '', {
                //     "tipe": 13,
                //     "namaMekanik": ""
                // })

                // const checkMekanik = await getMekanik?.listOfMekanik.filter((item : any) => item.namaMekanik ==
                // element.nama_mekanik)

                // Check SA
                const getSa : any = await MekanikRepository.detail( res, token ?? '', {
                    tipe : 23,
                    namaMekanik : element.service_advisor
                } )

                // return ResponseResult.successGet(res, getSa)
                if ( getSa?.ack == 1 ) {
                    dataStore.serviceAdvisorID = getSa?.listDropDown[ 0 ].nilai ?? 0
                }
                else {
                    const storeSa = await MekanikRepository.storeData( res, token ?? '', {
                        action : 0,
                        id : 0,
                        kodeKaryawan : "",
                        namaKaryawan : element.service_advisor,
                        jenisKelamin : "L",
                        alamat : "Jalann",
                        provinsi : 20,
                        kabupaten : "KOTA PONTIANAK",
                        kecamatan : "PONTIANAK KOTA",
                        kelurahan : "SUNGAIBANGKONG",
                        city : "",
                        kodePos : 78116,
                        noTelepon : "",
                        noHP : "081351351655",
                        kTP : "00000000000000",
                        tanggalBerhenti : "2023-01-01T00:00:00+07:00",
                        tanggalMasuk : "2023-01-02T00:00:00+07:00",
                        areaID : 0,
                        email : "",
                        catatan : "",
                        tempatLahir : "Jakarta",
                        tanggalLahir : "1991-02-08T00:00:00+07:00",
                        agama : 1,
                        berlakuKTP : "2023-02-08T00:00:00+07:00",
                        kebangsaan : 1,
                        statusKawin : 1,
                        statusKomisi : 0,
                        statusKaryawan : 0,
                        tipeKomisi : 0,
                        satuanKomisi : 0,
                        nilaiKomisi : 0,
                        statusPIT : 0,
                        listJabatan : [
                            {
                                "jabatan" : "Service Advisor",
                                "jabatanID" : 7
                            }
                        ],
                        listTrainingLevel : [
                            {
                                "idLevelTraining" : "22",
                                "trainingLevel" : null,
                                "idJabatan" : 7
                            }
                        ],
                        aktif : true,
                        listPayroll : [
                            {
                                "payrollID" : 0,
                                "gaji" : "Gaji Pokok",
                                "nilaiGaji" : 0
                            },
                            {
                                "payrollID" : 0,
                                "gaji" : "Tunjangan Jabatan",
                                "nilaiGaji" : 0
                            },
                            {
                                "payrollID" : 0,
                                "gaji" : "Tunjangan Kesehatan",
                                "nilaiGaji" : 0
                            },
                            {
                                "payrollID" : 0,
                                "gaji" : "Tunjangan Transport",
                                "nilaiGaji" : 0
                            },
                            {
                                "payrollID" : 0,
                                "gaji" : "Uang Harian",
                                "nilaiGaji" : 0
                            }
                        ],
                        nik : "000000"
                    } )

                    // return ResponseResult.successPost()

                    const getSa : any = await MekanikRepository.detail( res, token ?? '', {
                        tipe : 24,
                        namaMekanik : element.service_advisor
                    } )

                    dataStore.serviceAdvisorID = getSa?.listDropDown[ 0 ].nilai ?? 0
                }

                // Check Inspector

                const getInspector : any = await MekanikRepository.detail( res, token ?? '', {
                    tipe : 24,
                    namaMekanik : element.final_inspector
                } )

                // return ResponseResult.successGet( res, getInspector )

                if ( getInspector?.ack == 1 ) {
                    dataStore.serviceAdvisorID = getInspector?.listDropDown[ 0 ].nilai ?? 0
                }
                else {
                    const storeSa = await MekanikRepository.storeData( res, token ?? '', {
                        action : 0,
                        id : 0,
                        kodeKaryawan : "",
                        namaKaryawan : element.final_inspector,
                        jenisKelamin : "L",
                        alamat : "Jalann",
                        provinsi : 20,
                        kabupaten : "KOTA PONTIANAK",
                        kecamatan : "PONTIANAK KOTA",
                        kelurahan : "SUNGAIBANGKONG",
                        city : "",
                        kodePos : 78116,
                        noTelepon : "",
                        noHP : "081351351655",
                        kTP : "00000000000000",
                        tanggalBerhenti : "2023-01-01T00:00:00+07:00",
                        tanggalMasuk : "2023-01-02T00:00:00+07:00",
                        areaID : 0,
                        email : "",
                        catatan : "",
                        tempatLahir : "Jakarta",
                        tanggalLahir : "1991-02-08T00:00:00+07:00",
                        agama : 1,
                        berlakuKTP : "2023-02-08T00:00:00+07:00",
                        kebangsaan : 1,
                        statusKawin : 1,
                        statusKomisi : 0,
                        statusKaryawan : 0,
                        tipeKomisi : 0,
                        satuanKomisi : 0,
                        nilaiKomisi : 0,
                        statusPIT : 0,
                        listJabatan : [
                            {
                                "jabatan" : "Mekanik Final Inspector",
                                "jabatanID" : 12
                            }
                        ],
                        listTrainingLevel : [
                            {
                                "idLevelTraining" : "22",
                                "trainingLevel" : null,
                                "idJabatan" : 7
                            }
                        ],
                        aktif : true,
                        listPayroll : [
                            {
                                "payrollID" : 0,
                                "gaji" : "Gaji Pokok",
                                "nilaiGaji" : 0
                            },
                            {
                                "payrollID" : 0,
                                "gaji" : "Tunjangan Jabatan",
                                "nilaiGaji" : 0
                            },
                            {
                                "payrollID" : 0,
                                "gaji" : "Tunjangan Kesehatan",
                                "nilaiGaji" : 0
                            },
                            {
                                "payrollID" : 0,
                                "gaji" : "Tunjangan Transport",
                                "nilaiGaji" : 0
                            },
                            {
                                "payrollID" : 0,
                                "gaji" : "Uang Harian",
                                "nilaiGaji" : 0
                            }
                        ],
                        nik : "000000"
                    } )

                    // return ResponseResult.successGet( res, storeSa )

                    const getInspector : any = await MekanikRepository.detail( res, token ?? '', {
                        tipe : 24,
                        namaMekanik : element.final_inspector
                    } )

                    // return ResponseResult.successGet( res, getInspector )

                    dataStore.finalInspectorID = getInspector?.nilai ?? 0
                }


                const storePkb = await PkbRepository.storeData( res, token ?? '', dataStore )


                // return ResponseResult.successGet( res, storePkb )
            }
            return ResponseResult.successGet( res, "Success Import Data PKB" )


        } catch ( error : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : "01",
                message : error.message,
                data : error
            } )
        }


    }

    public proses = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceProsesPKB = req.body
        try {

            const token = await Token.get( req, res )
            const resp = await PkbRepository.prosesPKB( res, token ?? '', data )
            if ( resp !== null ) {
                if ( resp.ack === 1 ) {
                    return ResponseResult.successPost( res, resp.message )
                }
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : "01",
                    message : resp.message,
                    data : null,
                } )
            }
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : "01",
                message : 'Gagal proses PKB',
                data : null,
            } )

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                message : e.message,
                data : null,
            } )
        }
    }
}

export default new PkbController;
