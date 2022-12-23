// To parse this data:
//
//   import { Convert, ModelListAreaKalBar } from "./file";
//
//   const modelListAreaKalBar = Convert.toModelListAreaKalBar(json);

export interface ModelListAreaKalBar {
    listOfArea : ListOfArea[];
    message : string;
    ack : number;
}

export interface ListOfArea {
    id : number;
    idProvinsi : number;
    namaProvinsi : string;
    kabupaten : string;
    kecamatan : string;
    kelurahan : string;
    zipCode : string;
}

// Converts JSON strings to/from your types
export class ConvertModelListAreaKalBar {
    public static toModelListAreaKalBar( json : string ) : ModelListAreaKalBar {
        return JSON.parse( json );
    }

    public static modelListAreaKalBarToJson( value : ModelListAreaKalBar ) : string {
        return JSON.stringify( value );
    }
}
