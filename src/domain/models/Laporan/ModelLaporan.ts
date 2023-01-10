export interface ModelLaporanOfPkb {
    bulan: number;
    tahun: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toModelLaporanOfPkb(json: string): ModelLaporanOfPkb {
        return JSON.parse(json);
    }

    public static modelLaporanOfPkbToJson(value: ModelLaporanOfPkb): string {
        return JSON.stringify(value);
    }
}
