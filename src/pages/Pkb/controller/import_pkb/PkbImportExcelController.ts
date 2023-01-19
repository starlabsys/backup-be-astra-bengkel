import { ModelListExcel } from "../../model/ModelListExcel";
import { Request, Response } from "express";
import ResponseResult from "../../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../../utils/enum/EnumResponseCode";
import CustomerRepository from "../../../../domain/repository/CustomerRepository/CustomerRepository";
import Token from "../../../../utils/Token";
import ModelUsers from "../../../../db/models/ModelUsers";
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb";
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB";
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb";
import CustomerPkb from "./CustomerPkb";


class PkbImportExcelController {


    public importExcel = async ( req : Request, res : Response ) => {
        const data : ModelListExcel [] = req.body;
        try {

            for ( const item of data ) {
                const respUser = await ModelUsers.findOne( {
                    where : {
                        username : item.username
                    }
                } )

                if ( !respUser ) {
                    return ResponseResult.error( res, {
                        statusCode : EnumResponseCode.BAD_REQUEST,
                        errorCode : "01",
                        message : "User tidak Ditemukan",
                        data : null
                    } )
                }

                const checkToken = await Token.getTokenNew( req, res, respUser?.id );

                if ( checkToken ) {

                    const result : ModelResultImportPkb = await CustomerPkb.checkCustomer( {
                        data : item,
                        token : checkToken,
                        res : res,
                    } )

                    if ( result.message === EnumErrorImportPKB.success ) {
                        return ResponseResult.successPost( res, "Success Import Excel" );
                    }
                    else {
                        return ResponseResult.error( res, {
                            errorCode : '01',
                            statusCode : EnumResponseCode.BAD_REQUEST,
                            message : result.error,
                            data : null,
                        } );
                    }
                }
                else {
                    return ResponseResult.error( res, {
                        statusCode : EnumResponseCode.UNAUTHORIZED,
                        errorCode : '01',
                        message : 'Credential Login Tidak Valid',
                        data : null,
                    } )
                }
            }

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                errorCode : '01',
                statusCode : EnumResponseCode.FORBIDDEN,
                message : e,
                data : null,
            } );
        }
    }


}

export default new PkbImportExcelController();
