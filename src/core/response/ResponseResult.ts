import { Response } from "express";


class ResponseResult {
    public successPost = ( res : Response, message : string ) => {
        return res.status( 200 ).json( {
            errorCode : "00",
            status : true,
            message : message,
            data : null
        } );
    }

    public successGet = ( res : Response, data : any ) => {
        return res.status( 200 ).json( {
            errorCode : "00",
            status : true,
            message : "Success",
            data : data
        } );
    }

    public error = ( res : Response, props : {
        statusCode : number,
        errorCode : string,
        message : string,
        data : any
    } ) => {
        return res.status( props.statusCode ).json( {
            errorCode : props.errorCode,
            status : false,
            message : props.message,
            data : props.data
        } );
    }
}

export default new ResponseResult()
