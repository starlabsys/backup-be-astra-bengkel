import PkbController from "../Controllers/PkbController";
import VehicleController from "../Controllers/VehicleController";
import { auth } from "../middleware/AuthMiddleware";
// import validate from "..//Validators/PartsValidator";
// import validate from "../Validators/UserValidator";
import validate from "../Validators/VehicleValidator";
import BaseRoutes from "./BaseRoutes";


export class VehicleRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/', auth, VehicleController.index);
        this.router.post('/',  auth,validate,VehicleController.store);
        this.router.patch('/:id',  auth,validate, VehicleController.update);
        this.router.delete('/:id',  auth, VehicleController.delete);
        // this.router.post('/profile', auth, AuthController.profile);
    }
}

export default new VehicleRoutes().router; 