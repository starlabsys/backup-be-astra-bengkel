import { Response } from "express";
import { EnumResponseCode } from "../enum/EnumResponseCode";


interface InterfaceError {
    responseCode : EnumResponseCode,
    errorCodes : string,
    message : string,
    data : any
}

class RCPsshsoapi {
    public success = ( res : Response, data : any ) => {
        return res.status( 200 ).json( {
            errorCode : "00",
            status : true,
            message : "Success",
            data : data
        } );
    }
    public error = ( res : Response, data : InterfaceError ) => {
        return res.status( data.responseCode ).json( {
            errorCode : data.errorCodes,
            status : false,
            message : data.message,
            data : data.data
        } );
    }
}

export default new RCPsshsoapi();
