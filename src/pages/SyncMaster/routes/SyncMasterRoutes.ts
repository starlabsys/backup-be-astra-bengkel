import BaseRoutes from "../../../core/routes/BaseRoutes";
import { authAdmin } from "../../../middleware/AdminMiddleware";
import SyncMasterController from "../controller/SyncMasterController";
import { validateSyncMaster } from "../validator/validatorSyncMaster";


class SyncMasterRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/drop-down', validateSyncMaster, authAdmin, SyncMasterController.dropDown );
    }
}

export default new SyncMasterRoutes().router;
