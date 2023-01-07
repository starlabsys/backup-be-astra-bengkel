// To parse this data:
//
//   import { Convert, ModelListMekanikPKB } from "./file";
//
//   const modelListMekanikPKB = Convert.toModelListMekanikPKB(json);

export interface ModelListMekanikPKB {
    listDropDown : ListDropDown[];
    message : string;
    ack : number;
}

export interface ListDropDown {
    tipe : number;
    label : string;
    nilai : string;
    additionalNilai : string;
    statusKehadiran : number;
    labelStatusKehadiran : string;
}

// Converts JSON strings to/from your types
export class ConvertModelListMekanikPKB {
    public static toModelListMekanikPKB( json : string ) : ModelListMekanikPKB {
        return JSON.parse( json );
    }

    public static modelListMekanikPKBToJson( value : ModelListMekanikPKB ) : string {
        return JSON.stringify( value );
    }
}
