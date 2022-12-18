import { Response } from "express";
import { post } from "../../../core/api/api";


class AuthRepository {
    public login = async ( res : Response, props : {
        loginData : string,
    } ) => {
        return await post( res, {
            url : '/token',
            reqBody : props.loginData

        }, );
    }
}

export default new AuthRepository();
