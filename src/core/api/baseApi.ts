import { Request } from "express";
import ModelUsers from "../../db/models/ModelUsers";


export const timeOut = 50000

export const baseUrl = () : string => {
    if ( process.env.ENV === 'production' ) {
        return process.env.BASE_URL_PROD as string
    }
    return process.env.BASE_URL_DEV as string
}

interface InterfaceHeader {
    header? : boolean
    token? : string
}

export const header = async ( props : InterfaceHeader ) => {
    return {
        "Content-Type" : props.header ? "text/plain" : "application/json",
        "Accept" : "application/json, text/plain, */*",
        "Origin" : "https://psshsoapi.astra.co.id",
        'Authorization' : `Bearer ${ props.token }`
    }
}
