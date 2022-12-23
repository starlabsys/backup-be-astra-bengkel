// To parse this data:
//
//   import { Convert, ModelDetailCustomer } from "./file";
//
//   const modelDetailCustomer = Convert.toModelDetailCustomer(json);

export interface ModelDetailCustomer {
    id : number;
    kodeCustomer : string;
    title : string;
    namaCustomer : string;
    gender : string;
    noktp : string;
    noPassport : string;
    alamat : string;
    kabupaten : string;
    idProvinsi : string;
    tanggalUlangTahun : string;
    kecamatan : string;
    kelurahan : string;
    zipCode : string;
    noTelepon : string;
    noHp : string;
    noFaks : string;
    email : string;
    facebook : string;
    twitter : string;
    instagram : string;
    namaKontakPerson : string;
    noteleponKontakPerson : string;
    noHpKontakPerson : string;
    emailKontakPerson : string;
    jabatanKontakPerson : string;
    website : string;
    catatan : string;
    top : string;
    kodeGrupDiskonPelanggan : string;
    jabatanCustomerID : number;
    salesmanID : number;
    agama : number;
    npwp : string;
    nppkp : string;
    alamatPajak : string;
    alamatKirim : string;
    up : string;
    noTeleponAlamatKirim : string;
    limitKredit : number;
    aktif : boolean;
    labelAktif : string;
    isHaveQR : boolean;
    message : string;
    ack : number;
}

// Converts JSON strings to/from your types
export class ConvertModelDetailCustomer {
    public static toModelDetailCustomer( json : string ) : ModelDetailCustomer {
        return JSON.parse( json );
    }

    public static modelDetailCustomerToJson( value : ModelDetailCustomer ) : string {
        return JSON.stringify( value );
    }
}
