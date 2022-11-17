import PartsController from "../Controllers/PartsController";
import { authAdmin } from "../middleware/AdminMiddleware";
import validate from "..//Validators/PartsValidator";
// import validate from "../Validators/UserValidator";
import BaseRoutes from "./BaseRoutes";


export class PartsRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/', authAdmin, PartsController.index);
        this.router.post('/store', authAdmin, validate, PartsController.store);
        this.router.patch('/update', authAdmin, validate, PartsController.update);
        this.router.delete('/delete/:id', authAdmin, PartsController.delete);

        this.router.get('/test', PartsController.test);
        // this.router.post('/signin', AuthController.signin);
        // this.router.post('/profile', auth, AuthController.profile);
    }
}

export default new PartsRoutes().router; 