// To parse this data:
//
//   import { Convert, ModelResult } from "./file";
//
//   const modelResult = Convert.toModelResult(json);

export interface ModelResult {
    message : string;
    ack : number;
    customerID? : number;
}

// Converts JSON strings to/from your types
export class ConvertModelResult {
    public static toModelResult( json : string ) : ModelResult {
        return JSON.parse( json );
    }

    public static modelResultToJson( value : ModelResult ) : string {
        return JSON.stringify( value );
    }
}
