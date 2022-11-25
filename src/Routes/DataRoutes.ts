import DataController from "../Controllers/DataController";
import { auth } from "../middleware/AuthMiddleware";
// import validate from "../Validators/WorkshopValidator";
import BaseRoutes from "./BaseRoutes";


export class DataRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/sparepart', auth, DataController.index);
        this.router.get('/vehicle', auth, DataController.indexVehicle);
        this.router.get('/mechanic', auth, DataController.indexMechanic);
    }
}

export default new DataRoutes().router; 