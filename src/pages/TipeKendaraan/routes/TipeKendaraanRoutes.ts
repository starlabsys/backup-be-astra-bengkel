import BaseRoutes from "../../../core/routes/BaseRoutes";
import TipeKendaraanController from "../controller/TipeKendaraanController";
import { authAdmin } from "../../../middleware/AdminMiddleware";


class TipeKendaraanRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAdmin, TipeKendaraanController.getData )
    }

}

export default new TipeKendaraanRoutes().router;
