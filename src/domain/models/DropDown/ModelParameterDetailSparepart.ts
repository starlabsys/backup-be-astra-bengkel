// To parse this data:
//
//   import { Convert, ModelParameterDetailSparepart } from "./file";
//
//   const modelParameterDetailSparepart = Convert.toModelParameterDetailSparepart(json);

export interface ModelParameterDetailSparepart {
    idSparepart : number;
    namaSparepart : string;
    kodeSparepart : string;
    grupSparepart : number;
    namaLokal : string;
    uom : string;
    kategoriETD : string;
    hargaJual : number;
    pajakJual : number;
    rak : string;
    barcode : string;
    hargaClaimOli : number;
    catatan : string;
    tipeKomisi : number;
    satuanKomisi : number;
    nilaiKomisi : number;
    stok : number;
    aktif : boolean;
    isOriginalPart : boolean;
    hargaLokal : number;
    hargaNasional : number;
    grupKodeAHM : number;
    isHotLine : boolean;
    etaTercepat : Date;
    etaTerlama : Date;
    message : string;
    ack : number;
}

// Converts JSON strings to/from your types
export class ConvertModelParameterDetailSparepart {
    public static toModelParameterDetailSparepart( json : string ) : ModelParameterDetailSparepart {
        return JSON.parse( json );
    }

    public static modelParameterDetailSparepartToJson( value : ModelParameterDetailSparepart ) : string {
        return JSON.stringify( value );
    }
}
