import BaseRoutes from "../../../core/routes/BaseRoutes";
import CustomerController from "../controller/CustomerController";
import { authAdmin } from "../../../middleware/AdminMiddleware";


class CustomerRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAdmin, CustomerController.get );
        this.router.post( '/add', authAdmin, CustomerController.add );
        this.router.post( '/detail', authAdmin, CustomerController.detail );
        this.router.post( '/edit', authAdmin, CustomerController.update );
    }
}

export default new CustomerRoutes().router;
