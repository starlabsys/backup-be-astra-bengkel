import BaseRoutes from "../../../core/routes/BaseRoutes";
import VendorController from "../controller/VendorController";
import { authAdmin } from "../../../middleware/AdminMiddleware";
import VendorRepository from "../../../domain/repository/VendorRepository/VendorRepository";


class VendorRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAdmin, VendorController.getVendor )
        this.router.post( '/add', authAdmin, VendorController.addVendor )
        // .
    }

}

export default new VendorRoutes().router;
