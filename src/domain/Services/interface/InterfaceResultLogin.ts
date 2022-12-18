import { ConvertModelLogin, ModelLogin } from "../../models/Auth/ModelLogin";


export interface InterfaceResultLogin {
    message : string;
    statusCode : number;
    data : ModelLogin;
}
