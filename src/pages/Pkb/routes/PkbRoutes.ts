import BaseRoutes from "../../../core/routes/BaseRoutes";
import { authAdmin, authAll } from "../../../middleware/AdminMiddleware";
import PkbController from "../controller/PkbController";

// import PitMekanikController from "../controller/PitMekanikController";


class PkbRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAll, PkbController.getPkb )
        this.router.post( '/store', authAdmin, PkbController.storePkb )
        this.router.post( '/detail', authAdmin, PkbController.detailPkb )
        this.router.post( '/import', authAdmin,PkbController.importPkb )
        this.router.post( '/proses-pkb', authAdmin, PkbController.proses )
        // this.router.post('/detail', authAdmin, PitMekanikController.detailPitMekanik )
        // this.router.post( '/edit', authAdmin, VendorRepository.editData )
    }

}

export default new PkbRoutes().router;
