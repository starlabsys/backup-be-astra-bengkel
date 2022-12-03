import PitController from "../Controllers/PitController";
import ServiceController from "../Controllers/ServiceController";
import { auth } from "../middleware/AuthMiddleware";
import validate from "../Validators/ServiceValidator";
import BaseRoutes from "./BaseRoutes";


export class ServiceRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/', auth, ServiceController.index);
        this.router.post('/', auth,  ServiceController.store);
        this.router.patch('/:id', auth, validate, PitController.update);
        this.router.delete('/:id', auth, PitController.destroy);
    }
}

export default new ServiceRoutes().router; 