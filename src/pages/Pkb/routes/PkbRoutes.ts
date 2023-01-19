import BaseRoutes from "../../../core/routes/BaseRoutes";
import { authAdmin, authAll } from "../../../middleware/AdminMiddleware";
import PkbController from "../controller/PkbController";
import PkbImportController from "../controller/PkbImportController";
import PkbImportExcelController from "../controller/import_pkb/PkbImportExcelController";

// import PitMekanikController from "../controller/PitMekanikController";


class PkbRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAll, PkbController.getPkb )
        this.router.post( '/store', authAdmin, PkbController.storePkb )
        this.router.post( '/detail', authAdmin, PkbController.detailPkb )
        this.router.post( '/import/excel', authAll, PkbImportExcelController.importExcel )
        this.router.post( '/proses-pkb', authAdmin, PkbController.proses )
    }

}

export default new PkbRoutes().router;
