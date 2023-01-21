// To parse this data:
//
//   import { Convert, ModelResultJasaPkb } from "./file";
//
//   const modelResultJasaPkb = Convert.toModelResultJasaPkb(json);

export interface ModelResultJasaPkb {
    message : number;
    data : Data;
    error : string;
}

export interface Data {
    listofJasa : ListofJasa[];
    totalRow : number;
    message : string;
    ack : number;
}

export interface ListofJasa {
    id : number;
    aktif : number;
    labelAktif : string;
    kategoriPekerjaanID : number;
    labelkategoriPekerjaan : string;
    kodeJasa : string;
    namaJasa : string;
    label : string;
    grupJasa : number;
    subGrup : string;
    isFreeService : boolean;
    hargaJual : number;
    pajakJual : number;
    waktuKerja : number;
    oumKerja : number;
    labelGrupJasa : string;
    nilaiDiskon : number;
    persentaseDiskon : number;
}

// Converts JSON strings to/from your types
export class ConvertModelResultJasaPkb {
    public static toModelResultJasaPkb( json : string ) : ModelResultJasaPkb {
        return JSON.parse( json );
    }

    public static modelResultJasaPkbToJson( value : ModelResultJasaPkb ) : string {
        return JSON.stringify( value );
    }
}
