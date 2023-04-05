// To parse this data:
//
//   import { Convert, DetailGetJasa } from "./file";
//
//   const detailGetJasa = Convert.toDetailGetJasa(json);

export interface DetailGetJasa {
    listofJasa: ListofJasa[];
    message: string;
    ack: number;
}

export interface ListofJasa {
    id: number;
    aktif: number;
    labelAktif: string;
    kategoriPekerjaanID: number;
    labelkategoriPekerjaan: string;
    kodeJasa: string;
    namaJasa: string;
    label: string;
    grupJasa: number;
    subGrup: string;
    isFreeService: boolean;
    hargaJual: number;
    pajakJual: number;
    waktuKerja: number;
    oumKerja: number;
    labelGrupJasa: string;
    nilaiDiskon: number;
    persentaseDiskon: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDetailGetJasa(json: string): DetailGetJasa {
        return JSON.parse(json);
    }

    public static detailGetJasaToJson(value: DetailGetJasa): string {
        return JSON.stringify(value);
    }
}
