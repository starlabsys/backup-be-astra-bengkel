import { Response } from "express";


interface ErrorProps {
    statusCode : number;
    errorCode : string;
    message : string;
    data : any;
}

class ErrorHandler {

    public errorResponse = ( res : Response, props : ErrorProps ) => {
        return res.status( props.statusCode ).json( {
            errorCode : props.errorCode,
            status : false,
            message : props.message,
            data : props.data
        } );
    }
    public timeout = ( res : Response, props : ErrorProps ) => {
        return res.status( props.statusCode ).json( {
            errorCode : props.errorCode,
            status : false,
            message : props.message,
            data : props.data
        } );

    }
    public forbiddenAccess = ( res : Response, props : ErrorProps ) => {
        return res.status( props.statusCode ).json( {
            errorCode : props.errorCode,
            status : false,
            message : props.message,
            data : props.data
        } );

    }
    public notFound = ( res : Response, props : ErrorProps ) => {
        return res.status( props.statusCode ).json( {
            errorCode : props.errorCode,
            status : false,
            message : props.message,
            data : props.data
        } );
    }
    public methodNotAllowed = ( res : Response, props : ErrorProps ) => {
        return res.status( props.statusCode ).json( {
            errorCode : props.errorCode,
            status : false,
            message : props.message,
            data : props.data
        } );
    }
    public notAuthorized = ( res : Response, props : ErrorProps ) => {
        return res.status( props.statusCode ).json( {
            errorCode : props.errorCode,
            status : false,
            message : props.message,
            data : props.data
        } );
    }
    public networkError = ( res : Response, props : ErrorProps ) => {
        return res.status( props.statusCode ).json( {
            errorCode : props.errorCode,
            status : false,
            message : props.message,
            data : props.data
        } );
    }
    public internalError = ( res : Response, props : ErrorProps ) => {
        return res.status( props.statusCode ).json( {
            errorCode : props.errorCode,
            status : false,
            message : props.message,
            data : props.data
        } );
    }
}

export default new ErrorHandler()
