export interface InterfaceEditJasa {
    action : number,
    id : number,
    kodeJasa : string,
    namaJasa : string,
    grupJasa : string,
    hargaJual : number,
    pajakJual : number,
    oumKerja : number,
    tipeKomisi : number,
    satuanKomisi : number,
    nilaiKomisi : number,
    aktif : boolean,
    waktuKerja : 15,
    listSparePart : InterfaceSparepart[],
    kategoriPekerjaanID : 3
}

interface InterfaceSparepart {
    idRefMaterial : number,
    namaSparepart : string,
    kodeSparepart : string,
    quantity : number,
    aktif : boolean,
    labelAktif : string,
    isDisabel : symbol,
    guid : string,
}

