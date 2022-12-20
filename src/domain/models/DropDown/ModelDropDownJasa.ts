// To parse this data:
//
//   import { Convert, ModelDropDownJasa } from "./file";
//
//   const modelDropDownJasa = Convert.toModelDropDownJasa(json);

export interface ModelDropDownJasa {
    alasanIngatService : any[];
    hubunganDenganPemilik : any[];
    province : any[];
    menu : any[];
    lookup : any[];
    tipeServis : any[];
    agama : any[];
    tipeKomisi : any[];
    jenisKelamin : any[];
    statusPernikahan : any[];
    jabatanCustomer : any[];
    refUOM : KategoriPekerjaan[];
    satuanKomisi : KategoriPekerjaan[];
    statusPKB : any[];
    tipeAntrian : any[];
    kodePemindahan : any[];
    kategoriPekerjaan : KategoriPekerjaan[];
    exMainDealer : any[];
    statusPencarianPKB : any[];
    statusPembayaranPKB : any[];
    menuSATalk : any[];
    syncStatus : SyncStatus[];
    contacUs : string;
    mainDealerCode : string;
    isLiveHOO : boolean;
    alasanPause : any[];
    isLiveKPBDigital : boolean;
    message : string;
    ack : number;
}

export interface KategoriPekerjaan {
    id : number;
    value : string;
    text : string;
    type? : string;
}

export interface SyncStatus {
    objectName : string;
    status : number;
    lastSyncTime : Date;
    message : string;
    ack : number;
}

// Converts JSON strings to/from your types
export class ConvertModelDropDownJasa {
    public static toModelDropDownJasa( json : string ) : ModelDropDownJasa {
        return JSON.parse( json );
    }

    public static modelDropDownJasaToJson( value : ModelDropDownJasa ) : string {
        return JSON.stringify( value );
    }
}
