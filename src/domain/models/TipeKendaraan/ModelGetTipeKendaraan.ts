// To parse this data:
//
//   import { Convert, ModelGetTipeKendaraan } from "./file";
//
//   const modelGetTipeKendaraan = Convert.toModelGetTipeKendaraan(json);

export interface ModelGetTipeKendaraan {
    listOfTipeKendaraan : ListOfTipeKendaraan[];
    totalRow : number;
    message : string;
    ack : number;
}

export interface ListOfTipeKendaraan {
    id : number;
    idTipeKendaraanAHM : number;
    kodeTipeKendaraanAHM? : string;
    rowStatus : number;
    tipe : string;
    namaTipe : string;
    cc : number;
    model : string;
    status : string;
    aktif : boolean;
}


// Converts JSON strings to/from your types
export class ConvertModelGetTipeKendaraan {
    public static toModelGetTipeKendaraan( json : string ) : ModelGetTipeKendaraan {
        return JSON.parse( json );
    }

    public static modelGetTipeKendaraanToJson( value : ModelGetTipeKendaraan ) : string {
        return JSON.stringify( value );
    }
}
