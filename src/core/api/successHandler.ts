import RCPsshsoapi from "../../utils/ResponseCode/RCPsshsoapi";
import { Response } from "express";


interface InterfaceSuccess {
    errorCode : string;
    message : string;
    data : any;
}

class SuccessHandler {
    public success = ( res : Response, props : InterfaceSuccess ) => {
        return res.status( 200 ).json( {
            errorCode : "00",
            status : true,
            message : "Success",
            data : props.data
        } );
    }
}

export default new SuccessHandler();
