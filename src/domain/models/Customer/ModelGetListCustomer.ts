// To parse this data:
//
//   import { Convert, ModelGetListCustomer } from "./file";
//
//   const modelGetListCustomer = Convert.toModelGetListCustomer(json);

export interface ModelGetListCustomer {
    listPelanggan : ListPelanggan[];
    totalRow : number;
    message : string;
    ack : number;
}

export interface ListPelanggan {
    id : number;
    kodeCustomer : string;
    namaCustomer : string;
    alamat : string;
    kota : string;
    kecamatan : string;
    kelurahan : string;
    noTelepon : string;
    noHp : string;
    noFaks : string;
    top : string;
    aktif : boolean;
    labelAktif : string;
    idProvinsi : number;
}


// Converts JSON strings to/from your types
export class ConvertModelGetListCustomer {
    public static toModelGetListCustomer( json : string ) : ModelGetListCustomer {
        return JSON.parse( json );
    }

    public static modelGetListCustomerToJson( value : ModelGetListCustomer ) : string {
        return JSON.stringify( value );
    }
}
