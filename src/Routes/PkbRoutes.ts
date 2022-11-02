import PkbController from "../Controllers/PkbController";
import { auth } from "../middleware/AuthMiddleware";
// import validate from "..//Validators/PartsValidator";
// import validate from "../Validators/UserValidator";
import BaseRoutes from "./BaseRoutes";


export class PkbRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/', auth, PkbController.index);
        // this.router.post('/signin', AuthController.signin);
        // this.router.post('/profile', auth, AuthController.profile);
    }
}

export default new PkbRoutes().router; 