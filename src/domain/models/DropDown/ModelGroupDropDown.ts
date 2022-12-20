// To parse this data:
//
//   import { Convert, ModelGroupDropDownJasa } from "./file";
//
//   const modelGroupDropDownJasa = Convert.toModelGroupDropDownJasa(json);

export interface ModelGroupDropDownJasa {
    listDropDown : ListDropDown[];
    message : string;
    ack : number;
}

export interface ListDropDown {
    tipe : number;
    label : string;
    nilai : string;
    additionalNilai : string;
}

// Converts JSON strings to/from your types
export class ConvertModelGroupDropDownJasa {
    public static toModelGroupDropDownJasa( json : string ) : ModelGroupDropDownJasa {
        return JSON.parse( json );
    }

    public static modelGroupDropDownJasaToJson( value : ModelGroupDropDownJasa ) : string {
        return JSON.stringify( value );
    }
}
