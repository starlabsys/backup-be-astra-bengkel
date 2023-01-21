import { EnumErrorImportPKB } from "../enum/EnumErrorImportPKB";


interface InterfaceResultImportPkb {
    status : EnumErrorImportPKB,
    data? : any
    error? : any
}

export const ResponseImportPkb = ( props : InterfaceResultImportPkb ) => {
    return {
        message : props.status === EnumErrorImportPKB.success ? EnumErrorImportPKB.success : EnumErrorImportPKB.error,
        data : props.data ?? null,
        error : props.error ?? "Internal Server Error"
    }
}
