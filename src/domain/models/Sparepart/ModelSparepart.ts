// To parse this data:
//
//   import { Convert, ModelSparepart } from "./file";
//
//   const modelSparepart = Convert.toModelSparepart(json);

export interface ModelSparepart {
    id : number;
    namaSparepart : string;
    namaLokalSparepart : string;
    kodeSparepart : string;
    grupSparepart : string;
    label : string;
    hargaLokal : number;
    hargaNasional : number;
    hargaJual : number;
    hargaJualHET : number;
    uom : string;
    rak : string;
    aktif : boolean;
    nilaiDiskon : number;
    persentaseDiskon : number;
    stok : number;
    grupKodeAHM : string;
    kategoriETD : string;
    etaTercepat : Date;
    etaTerlama : Date;
}

// Converts JSON strings to/from your types
export class ConvertModelSparepart {
    public static toModelSparepart( json : string ) : ModelSparepart {
        return JSON.parse( json );
    }

    public static modelSparepartToJson( value : ModelSparepart ) : string {
        return JSON.stringify( value );
    }
}
