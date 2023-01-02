import { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import Token from "../../../utils/Token";

import PitMekanikRepository from "../../../domain/repository/PitMekanikRepository/PitMekanikRepository";
import {
    InterfaceGetPitMekanik
} from "../../../domain/repository/PitMekanikRepository/interface/InterfaceGetPitMekanik";
import {
    InterfaceStorePitMekanik
} from "../../../domain/repository/PitMekanikRepository/interface/InterfaceStorePitMekanik";
import ModelUsers from "../../../db/models/ModelUsers";
import GetUser from "../../../utils/GetAllUser/GetUser";
import { InterfaceDataUser } from "../../../utils/GetAllUser/Interface/InterfaceDataUser";
import { ListOfPITMekanik, ModelPitMekanik } from "../../../domain/models/PitMekanik/ModelPitMekanik";


class PitMekanikController {
    public getPitMekanik = async ( req : Request, res : Response ) => {
        try {

            if ( req.app.locals.credential.role === 'admin' ) {
                const data : InterfaceGetPitMekanik = req.body

                const user : InterfaceDataUser[] = await GetUser.getUser( req, res )

                // console.log( user.length );

                let arr_data : ModelPitMekanik = {
                    ack : 0,
                    message : '',
                    listOfPITMekanik : []
                };
                // const dataList = arr_data.listOfPITMekanik
                for ( const element of user ) {
                    const resp = await PitMekanikRepository.getData( res, element.token ?? '', data );


                    if ( resp !== null ) {
                        if ( resp.ack === 1 ) {
                            arr_data.listOfPITMekanik.push( ...resp.listOfPITMekanik )
                            arr_data.ack = resp.ack
                            arr_data.message = resp.message
                        }
                    }
                }

                return ResponseResult.successGet( res, arr_data )

            }
            else {
                // console.log(req.app.locals.credential.role)
                const data : InterfaceGetPitMekanik = req.body;
                const token = await Token.get( req, res );

                const resp = await PitMekanikRepository.getData( res, token ?? '', data );

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
            // console.log(req.app.locals.credential)
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                message : error.message,
                data : null
            } )
        }
    }

    public storePitMekanik = async ( req : Request, res : Response ) => {
        try {
            const data : InterfaceStorePitMekanik = req.body
            const token = await Token.get( req, res )

            const resp = await PitMekanikRepository.storeData( res, token ?? '', data )

            if ( resp !== null ) {
                if ( resp.ack === 1 ) {
                    return ResponseResult.successPost( res, resp.message )
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

    public test = async ( req : Request, res : Response ) => {
        try {
            const data : InterfaceGetPitMekanik = req.body

            const user : InterfaceDataUser[] = await GetUser.getUser( req, res )

            let arr_data : any[] = [];
            for ( let i = 0; i < user.length; i++ ) {
                const resp = await PitMekanikRepository.getData( res, user[ i ].token ?? '', data );

                if ( resp !== null ) {
                    arr_data.push( {
                        name : user[ i ].name,
                        data : resp
                    } )
                }
            }

            return ResponseResult.successGet( res, arr_data )
        } catch ( error : any ) {
            return ResponseResult.error( res, {
                statusCode : EnumResponseCode.FORBIDDEN,
                errorCode : "01",
                // message : error.message,
                message : req.app.locals.credential,
                data : null
            } )
        }
    }

    // public detailPitMekanik = async(req: Request, res: Response)=>{
    //     try {
    //         const data : InterfaceGetPitMekanik = req.body
    //         const token = await Token.get(req, res)

    //         const resp = await PitMekanikRepository.detailData(res, token ?? '', data)

    //         if (resp !== null) {
    //             return ResponseResult.successGet(res, resp)
    //         }

    //         return ResponseResult.error(res, {
    //             statusCode: EnumResponseCode.BAD_REQUEST,
    //             errorCode: "01",
    //             message: "Internal Error",
    //             data: null
    //         })
    //     } catch (error : any) {
    //         return ResponseResult.error(res, {
    //             statusCode: EnumResponseCode.FORBIDDEN,
    //             errorCode: "01",
    //             message: error.message,
    //             data: null
    //         })
    //     }

    // }
}

export default new PitMekanikController;
