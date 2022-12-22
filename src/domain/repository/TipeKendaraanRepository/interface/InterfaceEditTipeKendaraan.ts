// To parse this data:
//
//   import { Convert, InterfaceEditTipeKendaraan } from "./file";
//
//   const interfaceEditTipeKendaraan = Convert.toInterfaceEditTipeKendaraan(json);

export interface InterfaceEditTipeKendaraan {
    tipe : string;
    namaTipe : string;
    model : string;
    idTipeKendaraanAHM : number;
    id : number;
    aktif : boolean;
    dataSourceIDTipeKendaraan : DataSourceIDTipeKendaraan[];
    gridProps : GridProps;
    kodeTipeKendaraanAHM : string;
    cCMesin : number;
    action : number;
}

export interface DataSourceIDTipeKendaraan {
    text : string;
    value : string;
    additionalNilai : string;
}

export interface GridProps {
    pageSize : number;
    skip : number;
    totalRecords : number;
}

