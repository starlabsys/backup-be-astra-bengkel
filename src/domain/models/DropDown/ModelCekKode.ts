// To parse this data:
//
//   import { Convert, ModelCekKode } from "./file";
//
//   const modelCekKode = Convert.toModelCekKode(json);

export interface ModelCekKode {
    message : string;
    ack : number;
}

// Converts JSON strings to/from your types
export class ConvertModelCekKode {
    public static toModelCekKode( json : string ) : ModelCekKode {
        return JSON.parse( json );
    }

    public static modelCekKodeToJson( value : ModelCekKode ) : string {
        return JSON.stringify( value );
    }
}
