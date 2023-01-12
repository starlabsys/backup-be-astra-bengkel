// To parse this data:
//
//   import { Convert, ModelOfPKB } from "./file";
//
//   const modelOfPKB = Convert.toModelOfPKB(json);

export interface ModelOfPKB {
    listOfPKB: ListOfPKB[];
    pkbID?:      string;
    totalRow?:  number;
    message:   string;
    ack:       number;
}

export interface ListOfPKB {
    id:               number;
    pkbID?:           string;
    labelStatus:      string;
    status:           number;
    noPolisi:         string;
    engineNo:         string;
    noPKB:            string;
    noAntrian:        string;
    tanggal:          Date;
    idMekanik:        number;
    namaMekanik:      string;
    namaPemilik:      string;
    statusPekerjaan:  string;
    aktif:            boolean;
    isReadyBayar:     boolean;
    isHotline:        boolean;
    waktuTunggu:      string;
    durasiPengerjaan: string;
    jenisPekerjaan:   string;
    pitMekanik:       string;
    voucherType:      number;
    voucherValue:     number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toModelOfPKB(json: string): ModelOfPKB {
        return JSON.parse(json);
    }

    public static modelOfPKBToJson(value: ModelOfPKB): string {
        return JSON.stringify(value);
    }
}
