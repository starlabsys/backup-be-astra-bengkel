export interface InterfaceSparepart {
    action? : number,
    namaSparepart? : string,
    kodeSparepart? : string,
    namaLokalSparepart? : string;
    grupSparepart? : string;
    label? : string;
    hargaLokal? : number;
    hargaNasional? : number;
    hargaJual? : number;
    hargaJualHET? : number;
    uom? : string;
    rak? : string;
    aktif? : boolean;
    nilaiDiskon? : number;
    persentaseDiskon? : number;
    stok? : number;
    grupKodeAHM? : string;
    kategoriETD? : string;
    etaTercepat? : Date;
    etaTerlama? : Date;
    pageNumber? : number,
    pageSize? : number,
    totalRow? : number,
    sortColumn? : string,
    sortDirection? : number,
    namaLokal? : string,
    barcode? : string,
    plu? : string,
    hargaClaimOli? : number,
    catatan? : string,
    tipeKomisi? : number,
    satuanKomisi? : number,
    nilaiKomisi? : number
    
}
