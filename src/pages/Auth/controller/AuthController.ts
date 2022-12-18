import { Request, Response } from "express";
import ModelUsers from "../../../db/models/ModelUsers";
import AuthRepository from "../../../domain/repository/AuthRepository/AuthRepository";


class AuthController {
    public login = async ( req : Request, res : Response ) => {
        const { username, password } = req.body;
        try {
            const dataLogin = await ModelUsers.findOne( {
                where : {
                    username : username,
                    password : password
                }
            } )

            if ( dataLogin !== null ) {
                return await AuthRepository.login( res, {
                    loginData : dataLogin.login_data ?? ''
                } );
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
}

export default new AuthController();
