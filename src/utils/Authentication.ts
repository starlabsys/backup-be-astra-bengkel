import jwt from 'jsonwebtoken';

class Authentication {
    public static generateToken = (id: number, email: string, password: string ,roles: string): string => {
        const secretKey: string = process.env.SECRET_KEY || 'secretKey';
        const token: string = jwt.sign({id, email, password, roles}, secretKey, {expiresIn: '1h'});
        
        return token;
    }
}

export default Authentication;