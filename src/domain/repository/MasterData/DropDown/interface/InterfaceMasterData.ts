export interface InterfaceMasterData {
    listDropDown : InterfaceListDropDown[]
    action? : number
}

interface InterfaceListDropDown {
    tipe : number,
    label? : string,
    nilai : string
}
