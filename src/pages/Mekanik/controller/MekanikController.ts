import { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";
import MekanikRepository from "../../../domain/repository/Mekanik/MekanikRepository";
import { InterfaceGetMekanik } from "../../../domain/repository/Mekanik/interface/InterfaceGetMekanik";
import { InterfaceStoreMekanik } from "../../../domain/repository/Mekanik/interface/InterfaceStoreMekanik";
import GetUser from "../../../utils/GetAllUser/GetUser";
import { InterfaceDataUser } from "../../../utils/GetAllUser/Interface/InterfaceDataUser";


class MekanikController {
    public getMekanik = async ( req : Request, res : Response ) => {
        try {

            if (req.app.locals.credential.role === 'admin') {
                const data : InterfaceGetMekanik = req.body

                const user : InterfaceDataUser[] = await GetUser.getUser( req, res )

                let arr_data:any[] = [];
                for ( let i = 0; i < user.length; i++ ) {
                    const resp = await MekanikRepository.getData( res, user[ i ].token ?? '', data );

                    if ( resp !== null ) {
                        
                        for (let y = 0; y < resp.listOfKaryawanModel.length; y++) {
                            arr_data.push(resp.listOfKaryawanModel[y])
                        }
                    }
                }
                
                return ResponseResult.successGet( res, arr_data )
                
            }else{
                
                const data : InterfaceGetMekanik = req.body;
                const token = await Token.get( req, res );
    
                const resp = await MekanikRepository.getData( res, token ?? '', data );
    
                if ( resp !== null ) {
                    return ResponseResult.successGet( res, resp );
                }
    
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : "01",
                    message : "Internal Error",
                    data : null
                } )
            }

        } catch ( error : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                message : error.message,
                data : null
            } )
            // console.log(req.app.locals.creadential.role);
            
        }
    }

    public storeMekanik = async ( req : Request, res : Response ) => {
        try {
            const data : InterfaceStoreMekanik = req.body;
            const token = await Token.get( req, res );

            const resp = await MekanikRepository.storeData( res, token ?? '', data );

            if ( resp !== null ) {
                if ( resp.ack === 1 ) {
                    return ResponseResult.successPost( res, resp.message );
                }
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : "01",
                    message : resp.message,
                    data : null
                } )
            }

            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.BAD_REQUEST,
                errorCode : "01",
                message : "Internal Error",
                data : null
            } )
        } catch ( error : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                message : error.message,
                data : null
            } )
        }
    }
}

export default new MekanikController;
