import { Request } from "express";
import ModelUsers from "../../db/models/ModelUsers";


export const timeOut = 50000

export const baseUrl = () : string => {
    return "https://psshsoapi.astra.co.id/ahasssystemapi"
    // if ( process.env.ENV === 'production' ) {
    //     return process.env.BASE_URL_PROD as string
    // }
    // return process.env.BASE_URL_DEV as string
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
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        'Authorization' : `Bearer ${ props.token }`
    }
}
