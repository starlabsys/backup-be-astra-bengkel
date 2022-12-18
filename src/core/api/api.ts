import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import ErrorHandler from "./errorHandler";
import { baseUrl, header, timeOut } from "./baseApi";
import { Response } from "express";
import { EnumResponsePsshsoapi } from "../../utils/enum/EnumResponsePsshsoapi";
import { EnumResponseCode } from "../../utils/enum/EnumResponseCode";
import SuccessHandler from "./successHandler";


// if ( process.env.ENV === 'dev' ) {
axios.interceptors.request.use( request => {
    console.debug( 'METHOD : ', request.method );
    console.debug( 'URL : ', request.url );
    console.debug( 'Request Headers : ', request.headers );
    console.debug( 'Request Data : ', request.data );
    console.debug( '\n' );
    console.debug( 'REQUEST...' + '\n' );
    return request;
} );

axios.interceptors.response.use(
    response => {
        console.debug( 'RESPONSE : ' );
        console.debug( 'Response Status : ', response.status );
        console.debug( 'Response Headers : ', response.headers );
        console.debug( 'Response Body : ', response.data );
        return response;
    },
    error => {
        console.debug( 'RESPONSE : ' );
        console.debug( 'Response Status : ', error.response?.status );
        console.debug( 'Response Headers : ', error.response?.headers );
        console.debug( 'Response Body : ', error.response?.data );
        return Promise.reject( error );
    },
);
// }
// else {
//     axios.interceptors.request.use( request => {
//         return request;
//     } );
//
//     axios.interceptors.response.use(
//         response => {
//             return response;
//         },
//         error => {
//             return Promise.reject( error );
//         },
//     );
// }

interface ApiProps {
    url : string,
    reqBody? : {}
}


const fetchData = async ( res : Response, config : AxiosRequestConfig ) : Promise<any> => {
    try {
        const resp = await axios( config );
        if ( resp.status === 200 ) {
            return SuccessHandler.success( res, {
                errorCode : EnumResponsePsshsoapi.success,
                message : "Success",
                data : resp.data
            } );
        }
        return ErrorHandler.internalError( res, {
            statusCode : EnumResponseCode.INTERNAL_SERVER_ERROR,
            errorCode : EnumResponsePsshsoapi.errorPsshsoapiInternalServerError,
            message : 'Internal Server Error',
            data : null
        } );
    } catch ( e ) {
        const error = e as AxiosError;
        console.debug( '::ERROR:: ', '\n' + error );
        const data : any = error.response?.data;
        if ( error.response?.status === 400 ) {
            return ErrorHandler.errorResponse( res, {
                message : data.message,
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : EnumResponsePsshsoapi.errorPsshsoapiBadRequest,
                data : data.data
            } );
        }
        if ( error.response?.status === 401 ) {
            return ErrorHandler.errorResponse( res, {
                message : data.message,
                statusCode : EnumResponseCode.UNAUTHORIZED,
                errorCode : EnumResponsePsshsoapi.errorPsshsoapiUnauthorized,
                data : data.data
            } );
        }
        if ( error.response?.status === 403 ) {
            return ErrorHandler.notAuthorized( res, {
                message : data.message,
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : EnumResponsePsshsoapi.errorPsshsoapiForbidden,
                data : data.data
            } );
        }
        if ( error.response?.status === 404 ) {
            return ErrorHandler.notFound( res, {
                message : data.message,
                statusCode : EnumResponseCode.NOT_FOUND,
                errorCode : EnumResponsePsshsoapi.errorPsshsoapiNotFound,
                data : data.data
            } );
        }
        if ( error.response?.status === 405 ) {
            return ErrorHandler.methodNotAllowed( res, {
                message : data.message,
                statusCode : EnumResponseCode.METHOD_NOT_ALLOWED,
                errorCode : EnumResponsePsshsoapi.errorPsshsoapiMethodNotAllowed,
                data : data.data
            } );
        }
        if ( error.response?.status === 504 ) {
            return ErrorHandler.internalError( res, {
                message : data.message,
                statusCode : EnumResponseCode.TIMEOUT,
                errorCode : EnumResponsePsshsoapi.errorPsshsoapiGatewayTimeout,
                data : data.data
            } );
        }
        if ( error.message === 'ERR_BAD_REQUEST' ) {
            return ErrorHandler.networkError( res, {
                message : data.message,
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : EnumResponsePsshsoapi.errorPsshsoapiBadRequest,
                data : data.data
            } );
        }
        if ( error.code === "ERR_NETWORK" ) {
            return ErrorHandler.networkError( res, {
                message : data.message,
                statusCode : EnumResponseCode.NO_CONNECTION,
                errorCode : EnumResponsePsshsoapi.errorPsshsoapiNoHaveConnection,
                data : data.data
            } );
        }
        if ( error.message === 'Timeout' ) {
            return ErrorHandler.timeout( res, {
                message : data.message,
                statusCode : EnumResponseCode.TIMEOUT,
                errorCode : EnumResponsePsshsoapi.errorPsshsoapiGatewayTimeout,
                data : data.data
            } );
        }
        return ErrorHandler.internalError( res, {
            statusCode : EnumResponseCode.INTERNAL_SERVER_ERROR,
            errorCode : EnumResponsePsshsoapi.errorPsshsoapiInternalServerError,
            message : 'Internal Server Error',
            data : null
        } );
    } finally {
        console.debug( '::FINISH::' + '\n' );
    }
}

export const post = async ( res : Response, props : ApiProps ) : Promise<any> => {
    return await fetchData( res, {
        method : 'POST',
        url : baseUrl() + props.url,
        data : props.reqBody,
        headers : await header(),
        timeout : timeOut,
        timeoutErrorMessage : 'Timeout',
    } );

}
export const get = async ( res : Response, props : ApiProps ) : Promise<any> => {
    return await fetchData( res, {
        method : 'GET',
        url : baseUrl() + props.url,
        headers : await header(),
        timeout : timeOut,
        timeoutErrorMessage : 'Timeout',
    } );

}
export const put = async ( res : Response, props : ApiProps ) : Promise<any> => {
    return await fetchData( res, {
        method : 'PUT',
        url : baseUrl() + props.url,
        data : props.reqBody,
        headers : await header(),
        timeout : timeOut,
        timeoutErrorMessage : 'Timeout',
    } );

}
export const patch = async ( res : Response, props : ApiProps ) : Promise<any> => {
    return await fetchData( res, {
        method : 'PATCH',
        url : baseUrl() + props.url,
        data : props.reqBody,
        headers : await header(),
        timeout : timeOut,
        timeoutErrorMessage : 'Timeout',
    } );

}
export const del = async ( res : Response, props : ApiProps ) : Promise<any> => {
    return await fetchData( res, {
        method : 'DELETE',
        url : baseUrl() + props.url,
        data : props.reqBody,
        headers : await header(),
        timeout : timeOut,
        timeoutErrorMessage : 'Timeout',
    } );
}
