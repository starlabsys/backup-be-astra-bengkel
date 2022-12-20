import { Request, Response } from "express";
import { post } from "../../../core/api/api";
import { ConvertModelLogin, ModelLogin } from "../../models/Auth/ModelLogin";


class AuthRepository {
    public login = async ( res : Response, props : {
        loginData : string,
    } ) : Promise<ModelLogin | null> => {
        const resp = await post( res, {
            url : '/token',
            reqBody : props.loginData,
            headerLogin : true
        }, );

        // console.log(resp);
        
        if ( resp !== null ) {
            return ConvertModelLogin.toModelLogin( resp );
        }
        return null;
    }
}

export default new AuthRepository();
