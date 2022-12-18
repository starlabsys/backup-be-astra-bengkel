import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { InterfaceGenerateToken } from "./interface/InterfaceGenerateToken";


class Authentication {
    public passwordHash = ( password : string ) : Promise<string> => {
        return bcrypt.hash( password, 10 );
    }

    public passwordCompare = async ( password : string, encryptionPassword : string ) : Promise<boolean> => {
        return await bcrypt.compare( password, encryptionPassword );
    }

    public generateTokenUser = ( props : InterfaceGenerateToken ) : string => {
        const jwtKeyFromEnv : string = process.env.JWT_KEY || "secret";
        return jwt.sign( props, jwtKeyFromEnv );
    }

    // public static generateTokenAdmin = ( id : bigint, email : string, password : string, name : string ) : string =>
    // { const jwtKeyFromEnv : string = process.env.JWT_KEY || "secret";  return jwt.sign( { id, email, password, name
    // }, jwtKeyFromEnv ); }
}

export default new Authentication();
