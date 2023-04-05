export interface DetailJasa {
    listSparePart: ListSparePart[];
    id: number;
    kodeJasa: string;
    namaJasa: string;
    grupJasa: number;
    subGrup: string;
    hargaJual: number;
    pajakJual: number;
    flatRate: number;
    oumKerja: number;
    tipeKomisi: number;
    satuanKomisi: number;
    nilaiKomisi: number;
    aktif: boolean;
    waktuKerja: number;
    kategoriPekerjaanID: number;
    labelkategoriPekerjaan: string;
    isFreeService: boolean;
    isDisable: boolean;
    isC2: boolean;
    message: string;
    ack: number;
}

export interface ListSparePart {
    idRefMaterial: number;
    namaSparepart: string;
    kodeSparepart: string;
    hargaJual: number;
    quantity: number;
    aktif: boolean;
    isDisabel: boolean;
    labelAktif: string;
    stok: number;
    isFreeService: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDetailJasa(json: string): DetailJasa {
        return JSON.parse(json);
    }

    public static detailJasaToJson(value: DetailJasa): string {
        return JSON.stringify(value);
    }
}