import BaseRoutes from "../../../core/routes/BaseRoutes";
import CustomerController from "../controller/CustomerController";
import { authAdmin } from "../../../middleware/AdminMiddleware";


class CustomerRoutes extends BaseRoutes {
    routes() : void {
        // this.router.post( '/get', authAdmin, CustomerController.get );
    }
}

export default new CustomerRoutes().router;
