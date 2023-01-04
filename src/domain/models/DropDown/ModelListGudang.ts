// To parse this data:
//
//   import { Convert, ModelListGudang } from "./file";
//
//   const modelListGudang = Convert.toModelListGudang(json);

export interface ModelListGudang {
    listOfGudangModel : ListOfGudangModel[];
    message : string;
    ack : number;
}

export interface ListOfGudangModel {
    id : number;
    kodeGudang : string;
    namaGudang : string;
    alamat : string;
    label : string;
    area : Area;
    province : Province;
    city : City;
    noHp : string;
    noTelepon : string;
    noFaks : string;
    email : string;
    website : string;
    catatan : string;
    aktif : boolean;
}

export interface Area {
    id : number;
    provinceID : number;
    cityID : number;
    zipCode : string;
    kelurahan : string;
    kecamatan : string;
    kabupaten : string;
    ahmCode : string;
    bpsCode : string;
    rowStatus : number;
}

export interface City {
    id : number;
    text : string;
    rowStatus : number;
    flag : number;
}

export interface Province {
    id : number;
    value : string;
    provinceCode : string;
    text : string;
}

// Converts JSON strings to/from your types
export class ConvertModelListGudang {
    public static toModelListGudang( json : string ) : ModelListGudang {
        return JSON.parse( json );
    }

    public static modelListGudangToJson( value : ModelListGudang ) : string {
        return JSON.stringify( value );
    }
}
