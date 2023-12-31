import BaseRoutes from "../../../core/routes/BaseRoutes";
import KendaraanController from "../controller/KendaraanController";
import { authAdmin } from "../../../middleware/AdminMiddleware";


class KendaraanRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAdmin, KendaraanController.get );
        this.router.post( '/add', authAdmin, KendaraanController.addKendaraan );
        this.router.post( '/detail', authAdmin, KendaraanController.detailKendaraan );
        this.router.post( '/edit', authAdmin, KendaraanController.editKendaraan );
        this.router.post( '/get-pelanggan', authAdmin, KendaraanController.getPelanggan );
        this.router.post( '/get-kendaraan-services', authAdmin, KendaraanController.getKendaraanServices );
    }

}

export default new KendaraanRoutes().router;
