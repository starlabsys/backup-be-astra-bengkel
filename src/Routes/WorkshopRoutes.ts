import WorkshopController from "../Controllers/WorkshopController";
import { authAdmin } from "../middleware/AdminMiddleware";
import validate from "../Validators/WorkshopValidator";
import BaseRoutes from "./BaseRoutes";


export class WorkshopRoutes extends BaseRoutes {
    public routes(): void{
        this.router.get('/', authAdmin,WorkshopController.index);
        this.router.post('/', authAdmin, validate, WorkshopController.store);
        this.router.patch('/:id', authAdmin, validate,  WorkshopController.update);
        this.router.delete('/:id', authAdmin, WorkshopController.delete);
    }
}

export default new WorkshopRoutes().router; 