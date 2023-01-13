import { Request, Response } from "express";
import ModelUsers from "../db/models/ModelUsers";
import AuthRepository from "../domain/repository/AuthRepository/AuthRepository";
import ResponseResult from "../core/response/ResponseResult";
import Authentication from "../core/authentication/Authentication";


class Token {
    public get = async ( req : Request, res : Response ) => {
        const { id } = req.app.locals.credential;
        const user = await ModelUsers.findOne( {
            where : {
                id : id
            }
        } );

        if ( user !== null ) {
            if ( user?.token !== null ) {
                return user.token;
            }

            const checkLogin = await AuthRepository.login( res, {
                loginData : user.login_data ?? ''
            } )

            if ( checkLogin !== null ) {
                return checkLogin.access_token;
            }

            return null;
        }

        return null
    }
    public getDetail = async ( req : Request, res : Response, user_id : any ) => {
        // const { id } = req.app.locals.credential;
        const id = user_id;

        // return ResponseResult.successGet(res, id)
        const user = await ModelUsers.findOne( {
            where : {
                id : id
            }
        } );

        if ( user !== null ) {
            if ( user?.token !== null ) {
                return user.token;
            }

            const checkLogin = await AuthRepository.login( res, {
                loginData : user.login_data ?? ''
            } )

            if ( checkLogin !== null ) {
                return checkLogin.access_token;
            }

            return null;
        }

        return null
    }

    public getTokenNew = async ( req : Request, res : Response, user_id : any ) => {
        const user = await ModelUsers.findOne( {
            where : {
                id : user_id
            }
        })

        const resp = await AuthRepository.login( res, {
                    loginData : user?.login_data ?? ''
                } );

                // return ResponseResult.successGet( res, resp )

                if ( resp !== null ) {
                    console.log( "resp not null" );
                    console.log( resp );

                    await ModelUsers.update( {
                        token : resp.access_token
                    }, {
                        where : {
                            id : user?.id
                        }
                    } )

                    const generateToken = Authentication.generateTokenUser( {
                        id : Number( user?.id ?? 0 ),
                        full_name : user?.full_name ?? '',
                        username : user?.username ?? '',
                        kode_bengkel : user?.kode_bengkel ?? '',
                        nama_bengkel : user?.nama_bengkel ?? '',
                        role : user?.role ?? '',
                    } );

                   return resp.access_token
                }
    }


}

export default new Token();
