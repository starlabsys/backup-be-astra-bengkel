import { Request, Response } from "express";
import ModelUsers from "../../db/models/ModelUsers";
import Token from "../Token";
import AuthRepository from "../../domain/repository/AuthRepository/AuthRepository";
import { InterfaceDataUser } from "./Interface/InterfaceDataUser";


class GetUser {
    public getUser = async ( req : Request, res : Response ) : Promise<InterfaceDataUser[]> => {
        const user : ModelUsers[] = await ModelUsers.findAll( {
            // where : {
            //     role : 'user'
            // }
        } )

        let arr_user : InterfaceDataUser[] = [];

        for ( let index = 0; index < user.length; index++ ) {
            // const element = array[index];
            const checkLogin = await AuthRepository.login( res, {
                loginData : user[ index ].login_data ?? ''
            } )

            if ( checkLogin !== null ) {
                arr_user.push( {
                    name : user[ index ]?.nama_bengkel ?? '',
                    token : checkLogin?.access_token,
                } )
            }else{
                arr_user.push( {
                    name : user[ index ]?.nama_bengkel ?? '',
                    token : '',
                } )
            }

        }


        return arr_user
    }
}

export default new GetUser();
