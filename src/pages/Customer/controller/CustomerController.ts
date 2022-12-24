import ResponseResult from "../../../core/response/ResponseResult";
import { Request, Response } from "express";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";
import CustomerRepository from "../../../domain/repository/CustomerRepository/CustomerRepository";
import { InterfaceGetCustomer } from "../../../domain/repository/CustomerRepository/interface/InterfaceGetCustomer";
import { InterfaceAddCustomer } from "../../../domain/repository/CustomerRepository/interface/InterfaceAddCustomer";
import { InterfaceEditCustomer } from "../../../domain/repository/CustomerRepository/interface/InterfaceEditCustomer";
import {
    InterfaceDetailCustomer
} from "../../../domain/repository/CustomerRepository/interface/InterfaceDetailCustomer";


class CustomerController {
    public get = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceGetCustomer = req.body
        try {
            const token = await Token.get( req, res );
            const resp = await CustomerRepository.get( res, token ?? '', data );

            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp );
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.NOT_FOUND,
                errorCode : '01',
                message : "Data not found",
                data : null
            } );
        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : e.message,
                data : null
            } );
        }
    }

    public add = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceAddCustomer = req.body
        try {
            const token = await Token.get( req, res );
            const resp = await CustomerRepository.add( res, token ?? '', data );
            if ( resp !== null ) {
                if ( resp.ack === 1 ) {
                    return ResponseResult.successPost( res, resp.message );
                }
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : '01',
                    message : resp.message,
                    data : null
                } );
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.NOT_FOUND,
                errorCode : '01',
                message : "Data not found",
                data : null
            } );
        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : e.message,
                data : null
            } );
        }
    }

    public update = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceEditCustomer = req.body
        try {
            const token = await Token.get( req, res );
            const resp = await CustomerRepository.update( res, token ?? '', data );
            if ( resp !== null ) {
                return ResponseResult.successPost( res, resp.message );
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.NOT_FOUND,
                errorCode : '01',
                message : "Data not found",
                data : null
            } );
        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : e.message,
                data : null
            } );
        }
    }

    public detail = async ( req : Request, res : Response ) : Promise<Response> => {
        const data : InterfaceDetailCustomer = req.body
        try {
            const token = await Token.get( req, res );
            const resp = await CustomerRepository.detail( res, token ?? '', data );
            if ( resp !== null ) {
                return ResponseResult.successGet( res, resp );
            }
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.NOT_FOUND,
                errorCode : '01',
                message : "Data not found",
                data : null
            } )

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : '01',
                message : e.message,
                data : null
            } )
        }
    }
}

export default new CustomerController();
