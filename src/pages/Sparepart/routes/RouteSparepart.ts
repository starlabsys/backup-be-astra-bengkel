import BaseRoutes from "../../../core/routes/BaseRoutes";
import { authAdmin } from "../../../middleware/AdminMiddleware";
import SparepartController from "../controller/SparepartController";


class RouteSparepart extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAdmin, SparepartController.getSparepart );
    }

}


export default new RouteSparepart().router;
