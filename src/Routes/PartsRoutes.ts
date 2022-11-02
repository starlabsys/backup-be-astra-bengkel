import PartsController from "../Controllers/PartsController";
import { auth } from "../middleware/AuthMiddleware";
import validate from "..//Validators/PartsValidator";
// import validate from "../Validators/UserValidator";
import BaseRoutes from "./BaseRoutes";


export class PartsRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/', auth, PartsController.index);
        this.router.post('/store', auth, validate, PartsController.store);
        this.router.patch('/update', auth, validate, PartsController.update);
        this.router.delete('/delete/:id', auth, PartsController.delete);
        // this.router.post('/signin', AuthController.signin);
        // this.router.post('/profile', auth, AuthController.profile);
    }
}

export default new PartsRoutes().router; 