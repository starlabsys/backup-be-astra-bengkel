import BaseRoutes from "../../../core/routes/BaseRoutes";
import { authAdmin, authAll } from "../../../middleware/AdminMiddleware";
import LaporanController from "../controller/LaporanController";


class LaporanRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAll, LaporanController.getLaporan )
        this.router.post('/pkb', authAll, LaporanController.getPkb )
        // this.router.post('/store', authAdmin, PitController.storePit )
        // this.router.post( '/edit', authAdmin, VendorRepository.editData )
    }

}

export default new LaporanRoutes().router;
