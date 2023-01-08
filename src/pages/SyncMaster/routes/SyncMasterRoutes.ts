import BaseRoutes from "../../../core/routes/BaseRoutes";
import { authAdmin } from "../../../middleware/AdminMiddleware";
import SyncMasterController from "../controller/SyncMasterController";
import { validateGroupSyncMaster, validateSyncMaster } from "../validator/validatorSyncMaster";


class SyncMasterRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/drop-down', validateSyncMaster, authAdmin, SyncMasterController.dropDown );
        this.router.post( '/group-drop-down', validateGroupSyncMaster, authAdmin, SyncMasterController.groupDropDown );
        this.router.post( '/list-area', authAdmin, SyncMasterController.listArea );
        this.router.post( '/list-training', authAdmin, SyncMasterController.training );
        this.router.post( '/cek-kode', authAdmin, SyncMasterController.cekKode );
        this.router.post( '/list-gudang', authAdmin, SyncMasterController.getListGudang );
        this.router.post( '/list-mekanik', authAdmin, SyncMasterController.getListMekanik );
        this.router.post( '/list-sparepart', authAdmin, SyncMasterController.getListSparepart );
        this.router.post( '/detail-sparepart', authAdmin, SyncMasterController.detailSparepart );
    }
}

export default new SyncMasterRoutes().router;
