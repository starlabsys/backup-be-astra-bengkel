import DataController from "../Controllers/DataController";
import { auth } from "../middleware/AuthMiddleware";
// import validate from "../Validators/WorkshopValidator";
import BaseRoutes from "./BaseRoutes";


export class DataRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/sparepart', auth, DataController.index);
        this.router.get('/vehicle', DataController.indexVehicle);
        this.router.get('/mechanic', auth, DataController.indexMechanic);
        this.router.get('/provinces', DataController.indexProvince);
        this.router.get('/regencies', DataController.indexRegency);
        this.router.post('/provinces', DataController.storeProvinces);
        this.router.post('/regencies', DataController.storeRegencies);
        this.router.post('/district', DataController.storeDistrict);
    }
}

export default new DataRoutes().router; 