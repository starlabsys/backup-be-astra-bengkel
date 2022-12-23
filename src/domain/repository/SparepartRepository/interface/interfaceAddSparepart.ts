export interface InterfaceAddSparepart {
    namaSparepart: string,
    kodeSparepart: string,
    grupSparepart: string,
    grupKodeAHM: string,
    namaLokal: string,
    uom: string,
    hargaJual: number,
    rak?: string,
    barcode?: string,
    plu: string,
    hargaClaimOli: number,
    catatan: string,
    tipeKomisi: number,
    satuanKomisi: number,
    nilaiKomisi: number,
    aktif: boolean
}