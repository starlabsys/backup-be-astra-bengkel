// To parse this data:
//
//   import { Convert, ModelGetDetailKendaraan } from "./file";
//
//   const modelGetDetailKendaraan = Convert.toModelGetDetailKendaraan(json);

export interface ModelGetDetailKendaraan {
    id : number;
    idPelangan : number;
    namaPelangan : string;
    kodePelangan : string;
    idPelanganSTNK : number;
    namaPelanganSTNK : string;
    kodePelanganSTNK : string;
    noPolisi : string;
    noRangka : string;
    noMesin : string;
    warna : number;
    tipe : number;
    tahunRakit : Date;
    aktif : boolean;
    labelAktif : string;
    qrCode : string;
    namaPembawa : string;
    handphonePembawa : string;
    alamatPembawa : string;
    kotaPembawa : string;
    kecamatanPembawa : string;
    idProvinsi : number;
    isEditable : boolean;
    isHaveQR : boolean;
    message : string;
    ack : number;
}

// Converts JSON strings to/from your types
export class ConvertModelGetDetailKendaraan {
    public static toModelGetDetailKendaraan( json : string ) : ModelGetDetailKendaraan {
        return JSON.parse( json );
    }

    public static modelGetDetailKendaraanToJson( value : ModelGetDetailKendaraan ) : string {
        return JSON.stringify( value );
    }
}
