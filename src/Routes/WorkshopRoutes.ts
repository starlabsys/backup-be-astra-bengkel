import PkbController from "../Controllers/PkbController";
import VehicleController from "../Controllers/VehicleController";
import WorkshopController from "../Controllers/WorkshopController";
// import { auth } from "../middleware/AuthMiddleware";
import { authAdmin } from "../middleware/AdminMiddleware";

// import validate from "..//Validators/PartsValidator";
// import validate from "../Validators/UserValidator";
// import validate from "../Validators/VehicleValidator";
import validate from "../Validators/WorkshopValidator";
import BaseRoutes from "./BaseRoutes";


export class WorkshopRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/', authAdmin,WorkshopController.index);
        this.router.post('/', validate, authAdmin,WorkshopController.store);
        // this.router.post('/profile', auth, AuthController.profile);
    }
}

export default new WorkshopRoutes().router; 