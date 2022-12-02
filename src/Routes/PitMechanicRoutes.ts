import PitController from "../Controllers/PitController";
import PitMechanicController from "../Controllers/PitMechanicController";
import validate from '../Validators/PitMechanicValidator';
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from "./BaseRoutes";


export class PitRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/', auth, PitMechanicController.index);
        this.router.post('/', auth, validate, PitMechanicController.store);
        this.router.patch('/:id', auth, validate, PitMechanicController.update);
        this.router.delete('/:id', auth, PitMechanicController.destroy);
    }
}

export default new PitRoutes().router; 