import BaseRoutes from "../../../core/routes/BaseRoutes";
import { authAdmin } from "../../../middleware/AdminMiddleware";
import SparepartController from "../controller/SparepartController";


class RouteSparepart extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAdmin, SparepartController.getSparepart );
        this.router.post('/add', authAdmin, SparepartController.addSparepart);
        this.router.post('/detail', authAdmin, SparepartController.detailSparepart);
    }

}


export default new RouteSparepart().router;
