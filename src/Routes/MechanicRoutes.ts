import MechanicController from "../Controllers/MechanicController";
import WorkshopController from "../Controllers/WorkshopController";
import { authAdmin } from "../middleware/AdminMiddleware";
// import validate from "../Validators/WorkshopValidator";
import validate from "../Validators/MechanicValidator";
import BaseRoutes from "./BaseRoutes";


export class MechanicRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/', authAdmin,MechanicController.index);
        this.router.post('/', authAdmin, validate, MechanicController.store);
        this.router.patch('/:id', authAdmin, validate,  MechanicController.update);
        this.router.delete('/:id', authAdmin, MechanicController.delete);
    }
}

export default new MechanicRoutes().router; 