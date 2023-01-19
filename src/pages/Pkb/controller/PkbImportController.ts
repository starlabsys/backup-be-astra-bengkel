import { Request, Response } from "express";
import { ModelListExcel } from "../model/ModelListExcel";
import ModelUsers from "../../../db/models/ModelUsers";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";
import JasaRepository from "../../../domain/repository/JasaRepository/JasaRepository";
import CustomerRepository from "../../../domain/repository/CustomerRepository/CustomerRepository";
import AreaRepository from "../../../domain/repository/MasterData/Area/AreaRepository";
import KendaraanRepository from "../../../domain/repository/Kendaraan/KendaraanRepository";
import GetData from "../../../utils/GetData/GetData";
import PitRepository from "../../../domain/repository/PitRepository/PitRepository";
import MekanikRepository from "../../../domain/repository/Mekanik/MekanikRepository";
import PkbRepository from "../../../domain/repository/PkbRepository/PkbRepository";


class PkbImportController {
    public importPkb = async ( req : Request, res : Response ) => {
        const data : ModelListExcel [] = req.body;

        let messageResp = '';
        try {

            for ( const element of data ) {
                const respUser = await ModelUsers.findOne( {
                    where : {
                        username : element.username
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

            }

            for ( const element of data ) {

                const respUser = await ModelUsers.findOne( {
                    where : {
                        username : element.username
                    }
                } )

                // return ResponseResult.successGet(res, respUser?.id)

                const token = await Token.getTokenNew( req, res, respUser?.id );


                const split = element.tanggal.split( " " )

                // return ResponseResult.successGet(res, split)
                const date = split[ 0 ]
                // return ResponseResult.successGet(res, date)
                const tanggal = date.split( "/" )
                const fixtanggal = tanggal[ 2 ] + "-" + tanggal[ 1 ] + "-" + tanggal[ 0 ]

                // return ResponseResult.successGet(res, fixtanggal)
                let dataStore : any = {
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
                    gejala : element.gejala_analisa_service_advisor == null ? "" : element.gejala_analisa_service_advisor,
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
                    // return ResponseResult.successGet(res, "11")
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
                        hargaJual : Number( element.harga_jual ) ?? 100000,
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
                        guid : "",
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
                    namaPelanggan : element.customer,
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

                if ( checkCustomer?.ack === 1 ) {
                    // return ResponseResult.successGet(res, "ada")
                    const detailCustomer = await CustomerRepository.detail( res, token ?? '', {
                        action : 1,
                        id : checkCustomer?.listPelanggan[ 0 ].id ?? 1
                    } )

                    // return ResponseResult.successGet(res, detailCustomer)
                    dataStore.namaPembawa = detailCustomer?.namaCustomer
                    dataStore.alamatPembawa = detailCustomer?.alamat
                    dataStore.alamatPembawaSaatIni = detailCustomer?.alamat
                    dataStore.kotaPembawa = detailCustomer?.kabupaten
                    dataStore.handphonePembawa = detailCustomer?.noHp
                    // dataStore.title = detailCustomer?.title
                }
                else {

                    // return ResponseResult.successGet(res, element.pemilik)
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
                        namaCustomer : element.customer,
                        noktp : element.no_ktp.toString(),
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

                    // return ResponseResult.successGet(res, postDataCustomer)

                    // const checkCustomer1 = await CustomerRepository.get( res, token ?? '', {
                    //     action : 0,
                    //     kodePelanggan : postDataCustomer?.customerID,
                    //     alamatPelanggan : "",
                    //     namaPelanggan : element.pemilik,
                    //     kotaPelanggan : "",
                    //     kecamatanPelanggan : "",
                    //     kelurahanPelanggan : "",
                    //     pageNumber : 1,
                    //     pageSize : 10,
                    //     totalRow : 100,
                    //     sortColumn : "ID",
                    //     sortDirection : 0
                    // } )
                    const idCustomer = postDataCustomer?.customerID

                    // return ResponseResult.successGet(res, checkCustomer1)

                    const detailCustomer = await CustomerRepository.detail( res, token ?? '', {
                        action : 1,
                        id : Number( idCustomer )
                    } )

                    dataStore.namaPembawa = detailCustomer?.namaCustomer
                    dataStore.alamatPembawa = detailCustomer?.alamat
                    dataStore.alamatPembawaSaatIni = detailCustomer?.alamat
                    dataStore.kotaPembawa = detailCustomer?.kabupaten
                    dataStore.handphonePembawa = detailCustomer?.noHp

                }

                // action : 0,
                //     noPolisi : "",//element.no_polisi
                //     noMesin : element.no_mesin,
                //     namaCustomer : "",
                //     noRangka : "",//element.no_rangka
                //     pageNumber : 1,
                //     pageSize : 10,
                //     totalRow : 0,
                //     sortColumn : "ID",
                //     sortDirection : 0
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

                if ( checkKendaraan?.ack === 1 ) {
                    // return ResponseResult.successGet( res, "ada" )
                    const responseKendaraan = await GetData.getKendaraan( req, res, {
                        token : token ?? '',
                        no_polisi : "",//element.no_polisi
                        no_mesin : element.no_mesin,//
                        warna : "",//element.warna
                        no_rangka : "",//element.no_rangka
                        nama_tipe_kendaraan : "",//element.nama_tipe_kendaraan
                        idPelangan : 0,//checkCustomer?.listPelanggan[ 0 ].id ?? 0
                        idPelanganSTNK : 0,//checkCustomer?.listPelanggan[ 0 ].id ?? 0
                        tahunRakit : 0,//element.tahun_rakit
                    } )
                    console.log( "ada" )

                    dataStore.refEquipmentID = responseKendaraan
                    dataStore.noSTNK = element.no_stnk
                }
                else {
                    console.log( "tidak ada" )
                    // return ResponseResult.successGet( res, "tidak ada" )

                    const responseKendaraan = await GetData.getKendaraanStore( req, res, {
                        token : token ?? '',
                        no_polisi : element.no_polisi,
                        no_mesin : element.no_mesin,
                        warna : element.warna,
                        no_rangka : element.no_rangka,
                        nama_tipe_kendaraan : element.nama_tipe_kendaraan,
                        idPelangan : checkCustomer?.listPelanggan[ 0 ].id ?? 0,
                        idPelanganSTNK : checkCustomer?.listPelanggan[ 0 ].id ?? 0,
                        tahunRakit : element.tahun_rakit,
                    } )

                    dataStore.refEquipmentID = responseKendaraan
                    dataStore.noSTNK = element.no_stnk
                }


                const getPit = await PitRepository.getData( res, token ?? '', {
                    kodePIT : "",
                    tipePIT : element.tipe_antrian
                } )

                // return ResponseResult.successGet(res, getPit)

                if ( getPit?.ack === 1 ) {
                    // dataStore.
                    // return ResponseResult.successGet(res, "ada")
                    dataStore.idPit = getPit?.listOfPIT[ 0 ].id ?? 0
                }
                else {
                    // return ResponseResult.successGet(res, "PIT"+Math.floor(Math.random() * 100).toString())
                    const storePit = await PitRepository.storeData( res, token ?? '', {
                        action : 0,
                        id : 0,
                        kodePIT : element.tipe_antrian.toUpperCase() + Math.floor( Math.random() * 100 ).toString(),
                        tipePIT : element.tipe_antrian.toUpperCase(),
                        aktif : true
                    } )


                    dataStore.idPit = storePit?.pitID ?? 0
                    // return ResponseResult.successGet(res, storePit)
                }

                // return ResponseResult.successGet(res, element.service_advisor)


                // Check SA
                const getSa : any = await MekanikRepository.detail( res, token ?? '', {
                    tipe : 23,
                    namaMekanik : element.service_advisor
                } )

                // return ResponseResult.successGet(res, getSa)

                if ( getSa?.ack == 1 ) {
                    dataStore.serviceAdvisorID = getSa?.listDropDown[ 0 ].nilai ?? 0

                    // return ResponseResult.successGet(res, dataStore.serviceAdvisorID)
                }
                else {
                    // return ResponseResult.successGet(res, 'gaada')

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

                    // return ResponseResult.successGet(res, storeSa)

                    // return ResponseResult.successPost()

                    const getSa : any = await MekanikRepository.detail( res, token ?? '', {
                        tipe : 24,
                        namaMekanik : element.service_advisor
                    } )

                    // return ResponseResult.successGet( res, getSa )

                    dataStore.serviceAdvisorID = getSa?.listDropDown[ 0 ].nilai ?? 0
                }

                // Check Inspector

                const getInspector : any = await MekanikRepository.detail( res, token ?? '', {
                    tipe : 24,
                    namaMekanik : element.final_inspector
                } )

                // return ResponseResult.successGet( res, getInspector )

                if ( getInspector?.ack === 1 ) {
                    // return ResponseResult.successGet( res, "ada" )
                    dataStore.serviceAdvisorID = getInspector?.listDropDown[ 0 ].nilai ?? 0
                }
                else {
                    // return ResponseResult.successGet( res, "Tidak ada" )
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

                    dataStore.finalInspectorID = getInspector?.listDropDown[ 0 ].nilai ?? 0
                }

                // return ResponseResult.successGet(res, dataStore)

                const storePkb = await PkbRepository.storeData( res, token ?? '', dataStore )


                messageResp = storePkb?.message ?? ''
                // return ResponseResult.successGet( res, storePkb )
            }
            return ResponseResult.successPost( res, messageResp )


        } catch ( error : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : "01",
                message : error.message,
                data : error
            } )
        }


    }
}

export default new PkbImportController();
