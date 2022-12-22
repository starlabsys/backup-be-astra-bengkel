import BaseRoutes from "../../../core/routes/BaseRoutes";
import KendaraanController from "../controller/KendaraanController";
import { authAdmin } from "../../../middleware/AdminMiddleware";


class KendaraanRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAdmin, KendaraanController.get );
        this.router.post( '/get-pelanggan', authAdmin, KendaraanController.getPelanggan );
    }

}

export default new KendaraanRoutes().router;
