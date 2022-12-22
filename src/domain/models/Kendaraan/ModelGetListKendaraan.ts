// To parse this data:
//
//   import { Convert, ModelGetListKendaraan } from "./file";
//
//   const modelGetListKendaraan = Convert.toModelGetListKendaraan(json);

export interface ModelGetListKendaraan {
    listofKendaraan : ListofKendaraan[];
    totalRow : number;
    message : string;
    ack : number;
}

export interface ListofKendaraan {
    id : number;
    idPelanggan : number;
    aktif : boolean;
    labelAktif : string;
    noPolisi : string;
    noMesin : string;
    noRangka : string;
    customer : string;
    tipe : string;
    warna : string;
    tahunRakit : Date;
    namaPembawa : string;
    handphonePembawa : string;
    alamatPembawa : string;
    kotaPembawa : string;
    kecamatanPembawa : string;
    isEditable : boolean;
}


// Converts JSON strings to/from your types
export class ConvertModelGetListKendaraan {
    public static toModelGetListKendaraan( json : string ) : ModelGetListKendaraan {
        return JSON.parse( json );
    }

    public static modelGetListKendaraanToJson( value : ModelGetListKendaraan ) : string {
        return JSON.stringify( value );
    }
}
