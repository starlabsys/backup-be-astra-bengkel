import { Request, Response } from "express";
import ModelUsers from "../db/models/ModelUsers";
import AuthRepository from "../domain/repository/AuthRepository/AuthRepository";


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
        const id = user_id;

        const user = await ModelUsers.findOne( {
            where : {
                id : id
            }
        } );

        if ( user !== null ) {
            // if ( user?.token !== null ) {
            //     return user.token;
            // }

            // return user.login_data
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


}

export default new Token();
