export interface InterfaceAddDataServices {
    token? : string;
    action : number;
    idPKB : number;
    pkbNo : string;
    refEquipmentID : number;
    statusPKB : number;
    tipePKB : number;
    noAntrian : string;
    kmSekarang : number;
    kmBerikutnya : number;
    namaPembawa : string;
    alamatPembawa : string;
    alamatPembawaSaatIni : string;
    kotaPembawa : string;
    handphonePembawa : string;
    hubunganDgPemilikID : number;
    alasanIngatServiceID : number;
    dealerSendiri : boolean;
    keluhan : string;
    gejala : string;
    pergantianPart : boolean;
    partBekasDibawaKonsumen : boolean;
    refMechanicID : string;
    serviceAdvisorID : string;
    finalInspectorID : string;
    jamMasuk : string;
    jamProses : string;
    jamSelesai : string;
    uangMuka : number;
    idGudang : string;
    idPit : number;
    listOfPekerjaan : ListOfPekerjaan[];
    listOfMaterialHotline : any[];
    tanggal : string;
    latitude : string;
    longitude : string;
    noSTNK : string;
    indikatorBensin : number;
    svPKBReturnID : number;
    kodeAntrian : string;
    tipeAntrian : string;
    activityCapacity : number;
    kecamatanPembawa : string;
    pkbRemove : PkbRemove;
    tipeComingCustomer : string;
    isEngineNo : boolean;
    isFrameNo : boolean;
    isPKBHotline : boolean;
    jamEstimasiSelesai : string;
    jamKedatanganCustomer : string;
    noClaimC2 : string;
    noBuku : string;
    DataMotorkuX : DataMotorkuX;
}

export interface DataMotorkuX {
    VoucherType : number;
    VoucherValue : number;
}

export interface ListOfPekerjaan {
    guid : string;
    pkbID : number;
    pkbPekerjaanID : number;
    itemNo : number;
    refJobID : number;
    nilaiDiskon : number;
    nilaiDiskonJasa : number;
    persentaseDiskon : number;
    persentaseDiskonJasa : number;
    totalJasa : number;
    pajakJasa : number;
    hargaPekerjaan : number;
    namaPekerjaan : string;
    isOPL : boolean;
    labelisOPL : string;
    listOfMaterial : InterfaceListSparePartPKB[];
    listOfMaterialHotline : any[];
    kodeJasa : string;
    idJasa : number;
    isShowDelete : boolean;
    isEditable : boolean;
    isFreeService : boolean;
    markUpJasa : number;
    vendorID : string;
    flatRate : number;
    noClaimC2 : string;
    noBuku : string;
    isAdditionalPekerjaan : number;
}

export interface PkbRemove {
    listRemovePekerjaan : any[];
    listRemoveMaterial : any[];
}

// To parse this data:
//
//   import { Convert, InterfaceListSparePartPKB } from "./file";
//
//   const interfaceListSparePartPKB = Convert.toInterfaceListSparePartPKB(json);

export interface InterfaceListSparePartPKB {
    guid : string;
    pekerjaanID : number;
    pkbMaterialID : number;
    itemNoMaterial : number;
    refNo : number;
    refNoLabel : string;
    refMaterialId : number;
    nilaiDiskon : number;
    nilaiDiskonMaterial : number;
    persentaseDiskon : number;
    persentaseDiskonMaterial : number;
    totalMaterial : number;
    pajakMaterial : number;
    pajak : number;
    stok : number;
    hargaJualMaterial : number;
    hargaJual : number;
    namaMaterial : string;
    quantity : number;
    isEditable : boolean;
    kodeSparepart : string;
    markUpMaterial : number;
    isHotline : boolean;
    isAdditionalMaterial : number;
}

