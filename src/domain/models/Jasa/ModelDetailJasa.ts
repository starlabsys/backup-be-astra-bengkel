// To parse this data:
//
//   import { Convert, ModelDetailJasa } from "./file";
//
//   const modelDetailJasa = Convert.toModelDetailJasa(json);

export interface ModelDetailJasa {
    listSparePart : any[];
    id : number;
    kodeJasa : string;
    namaJasa : string;
    grupJasa : number;
    hargaJual : number;
    pajakJual : number;
    flatRate : number;
    oumKerja : number;
    tipeKomisi : number;
    satuanKomisi : number;
    nilaiKomisi : number;
    aktif : boolean;
    waktuKerja : number;
    kategoriPekerjaanID : number;
    labelkategoriPekerjaan : string;
    isFreeService : boolean;
    isDisable : boolean;
    isC2 : boolean;
    message : string;
    ack : number;
}

// Converts JSON strings to/from your types
export class ConvertModelDetailJasa {
    public static toModelDetailJasa( json : string ) : ModelDetailJasa {
        return JSON.parse( json );
    }

    public static modelDetailJasaToJson( value : ModelDetailJasa ) : string {
        return JSON.stringify( value );
    }
}
