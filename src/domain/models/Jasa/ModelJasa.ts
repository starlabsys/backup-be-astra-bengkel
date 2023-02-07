// To parse this data:
//
//   import { Convert, ModelJasa } from "./file";
//
//   const modelJasa = Convert.toModelJasa(json);

export interface ModelJasa {
    id : number;
    aktif : number;
    labelAktif : string;
    kategoriPekerjaanID : number;
    labelkategoriPekerjaan : string;
    kodeJasa : string;
    namaJasa : string;
    label : string;
    grupJasa : number;
    isFreeService : boolean;
    hargaJual : number;
    pajakJual : number;
    waktuKerja : number;
    oumKerja : number;
    labelGrupJasa : string;
    nilaiDiskon : number;
    persentaseDiskon : number;
    ack? : number;
}

// Converts JSON strings to/from your types
export class ConvertModelJasa {
    public static toModelJasa( json : string ) : ModelJasa {
        return JSON.parse( json );
    }

    public static modelJasaToJson( value : ModelJasa ) : string {
        return JSON.stringify( value );
    }
}
