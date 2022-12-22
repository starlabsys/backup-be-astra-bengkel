// To parse this data:
//
//   import { Convert, ModelGetListPelanggan } from "./file";
//
//   const modelGetListCustomer = Convert.toModelGetListCustomer(json);

export interface ModelGetListPelanggan {
    listPelanggan : ListPelanggan[];
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
export class ConvertModelGetListPelanggan {
    public static toModelGetListCustomer( json : string ) : ModelGetListPelanggan {
        return JSON.parse( json );
    }

    public static modelGetListCustomerToJson( value : ModelGetListPelanggan ) : string {
        return JSON.stringify( value );
    }
}
