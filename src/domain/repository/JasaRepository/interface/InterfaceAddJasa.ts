// To parse this data:
//
//   import { Convert, InterfaceAddJasa } from "./file";
//
//   const interfaceAddJasa = Convert.toInterfaceAddJasa(json);

export interface InterfaceAddJasa {
    action : number;
    id : number;
    kodeJasa : string;
    namaJasa : string;
    grupJasa : string;
    subGrup : string;
    hargaJual : number;
    pajakJual : null;
    oumKerja : string;
    catatan : string;
    tipeKomisi : number;
    satuanKomisi : string;
    nilaiKomisi : number;
    aktif : boolean;
    waktuKerja : number;
    listSparePart : ListSparePart[];
    kategoriPekerjaanID : string;
}

export interface ListSparePart {
    idRefMaterial : number;
    namaSparepart : string;
    kodeSparepart : string;
    quantity : number;
    aktif : boolean;
    labelAktif : string;
    isDisabel : boolean;
    guid : string;
}

