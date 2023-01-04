// To parse this data:
//
//   import { Convert, ModelKendaraanServices } from "./file";
//
//   const modelKendaraanServices = Convert.toModelKendaraanServices(json);

export interface ModelKendaraanServices {
    listofKendaraan : ListofKendaraan[];
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
export class ConvertModelKendaraanServices {
    public static toModelKendaraanServices( json : string ) : ModelKendaraanServices {
        return JSON.parse( json );
    }

    public static modelKendaraanServicesToJson( value : ModelKendaraanServices ) : string {
        return JSON.stringify( value );
    }
}
