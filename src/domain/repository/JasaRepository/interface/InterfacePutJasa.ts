// To parse this data:
//
//   import { Convert, ModelPutJasa } from "./file";
//
//   const modelPutJasa = Convert.toModelPutJasa(json);

export interface ModelPutJasa {
    action : number;
    id : number;
    kodeJasa : string;
    namaJasa : string;
    grupJasa : string;
    subGrup : string;
    hargaJual : number;
    pajakJual : number;
    oumKerja : number;
    tipeKomisi : number;
    satuanKomisi : string;
    nilaiKomisi : number;
    aktif : boolean;
    waktuKerja : number;
    listSparePart : ListSparePart[];
    kategoriPekerjaanID : number;
}

export interface ListSparePart {
    idRefMaterial : number;
    namaSparepart : string;
    kodeSparepart : string;
    hargaJual : number;
    quantity : number;
    aktif : boolean;
    isDisabel : boolean;
    labelAktif : string;
    stok : number;
    isFreeService : boolean;
    guid : string;
}

