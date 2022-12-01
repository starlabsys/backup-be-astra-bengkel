import PitController from "../Controllers/PitController";
import { auth } from "../middleware/AuthMiddleware";
import validate from "../Validators/PitValidator";
import BaseRoutes from "./BaseRoutes";


export class PitRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/', auth, PitController.index);
        this.router.post('/', auth, validate, PitController.store);
        this.router.patch('/:id', auth, validate, PitController.update);
        this.router.delete('/:id', auth, PitController.destroy);
        // this.router.post('/signin', AuthController.signin);
        // this.router.post('/profile', auth, AuthController.profile);
    }
}

export default new PitRoutes().router; 