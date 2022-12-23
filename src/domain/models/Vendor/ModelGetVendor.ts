// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);

export interface ModelGetVendor {
    listOfVendor: ListOfVendor[];
    totalRow:     number;
    message:      string;
    ack:          number;
}

export interface ListOfVendor {
    id:                    number;
    kodeVendor:            string;
    namaVendor:            string;
    alamat:                string;
    area:                  Area;
    province:              Province;
    city:                  City;
    noHp:                  string;
    noTelepon:             string;
    noFaks:                string;
    email:                 string;
    website:               string;
    catatan:               string;
    namaKontakPerson:      string;
    noteleponKontakPerson: string;
    noHpKontakPerson:      string;
    emailKontakPerson:     string;
    jabatanKontakPerson:   string;
    tOP:                   number;
    limitKredit:           number;
    aktif:                 boolean;
}

export interface Area {
    id:         number;
    provinceID: number;
    cityID:     number;
    zipCode:    string;
    kelurahan:  string;
    kecamatan:  string;
    kabupaten:  string;
    ahmCode:    string;
    bpsCode:    string;
    rowStatus:  number;
}

export interface City {
    id:        number;
    text:      string;
    rowStatus: number;
    flag:      number;
}

export interface Province {
    id:           number;
    value:        string;
    provinceCode: string;
    text:         string;
}

// Converts JSON strings to/from your types
export class ConvertGetVendor {
    public static toWelcome(json: string): ModelGetVendor {
        return JSON.parse(json);
    }

    public static welcomeToJson(value: ModelGetVendor): string {
        return JSON.stringify(value);
    }
}
