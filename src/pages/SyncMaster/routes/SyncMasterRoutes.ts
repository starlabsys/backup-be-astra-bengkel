import BaseRoutes from "../../../core/routes/BaseRoutes";
import { authAdmin } from "../../../middleware/AdminMiddleware";
import SyncMasterController from "../controller/SyncMasterController";


class SyncMasterRoutes extends BaseRoutes {
    routes() : void {
        this.router.get( '/drop-down', authAdmin, SyncMasterController.dropDown );
    }
}

export default new SyncMasterRoutes().router;
