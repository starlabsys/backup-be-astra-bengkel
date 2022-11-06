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
        this.router.post('/', validate, auth,VehicleController.store);
        // this.router.post('/profile', auth, AuthController.profile);
    }
}

export default new VehicleRoutes().router; 