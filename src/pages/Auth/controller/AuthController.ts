import { Request, Response } from "express";
import ModelUsers from "../../../db/models/ModelUsers";
import AuthRepository from "../../../domain/repository/AuthRepository/AuthRepository";
import ResponseResult from "../../../core/response/ResponseResult";
import Authentication from "../../../core/authentication/Authentication";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";


class AuthController {
    public login = async ( req : Request, res : Response ) => {
        const { username, password } = req.body;
        try {
            const dataLogin = await ModelUsers.findOne( {
                where : {
                    username : username,
                }
            } )

            const checkLogin = await Authentication.passwordCompare( password, dataLogin?.password ?? '' )
            //
            if ( !checkLogin ) {
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.FORBIDDEN,
                    errorCode : '01',
                    message : 'Username or password is incorrect',
                    data : null
                } )
            }

            if ( dataLogin !== null ) {
                const resp = await AuthRepository.login( res, {
                    loginData : dataLogin.login_data ?? ''
                } );


                if ( resp !== null ) {
                    await ModelUsers.update( {
                        token : resp.access_token
                    }, {
                        where : {
                            id : dataLogin.id
                        }
                    } )

                    const generateToken = Authentication.generateTokenUser( {
                        id : Number( dataLogin.id ?? 0 ),
                        full_name : dataLogin.full_name ?? '',
                        username : dataLogin.username ?? '',
                        kode_bengkel : dataLogin.kode_bengkel ?? '',
                        nama_bengkel : dataLogin.nama_bengkel ?? '',
                        role : dataLogin.role ?? '',
                    } );
                    return ResponseResult.successGet( res, {
                        token : generateToken,
                        result : {
                            name : resp.FullName,
                            kodeBengkel : resp.branchCode,
                            namaBengkel : resp.branchName,
                            role : resp.Role
                        }
                    } );
                }
            }
            return res.status( 401 ).json( {
                message : 'Username or Password is Wrong'
            } )
        } catch ( e : any ) {
            return res.status( 500 ).json( {
                message : e.toString()
            } );
        }
    }

    public register = async ( req : Request, res : Response ) => {
        const { username, password, fullName, kodeBengkel, namaBengkel, role, loginData } = req.body;

        try {
            await ModelUsers.create( {
                username : username,
                password : await Authentication.passwordHash( password ),
                full_name : fullName,
                kode_bengkel : kodeBengkel,
                nama_bengkel : namaBengkel,
                role : role,
                login_data : loginData
            } );

            return ResponseResult.successPost( res, "Success Create Data" );

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : 500,
                errorCode : '01',
                message : e.toString(),
                data : null
            } )
        }


    }
}

export default new AuthController();
