import AuthController from "../Controllers/AuthController";
import { auth } from "../middleware/AuthMiddleware";
import validate from "../Validators/UserValidator";
import BaseRoutes from "./BaseRoutes";


export class AuthRoutes extends BaseRoutes {
    public routes(): void{
        this.router.post('/signup', validate, AuthController.signup);
        this.router.post('/signin', AuthController.signin);
        this.router.post('/profile', auth,AuthController.profile);
    }
}

export default new AuthRoutes().router; 