export interface InterfaceGetPkb {
    action: number,
    noPKB: string,
    tanggal: Date,
    tanggalSampai: Date,
    statusPencarianPKB: string,
    noPolisi: string,
    pageNumber: number,
    pageSize: number,
    totalRow: number,
    sortColumn: string,
    sortDirection: number,
    isFirstLoad: boolean
}