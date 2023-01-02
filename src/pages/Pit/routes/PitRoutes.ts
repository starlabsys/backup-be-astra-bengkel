import BaseRoutes from "../../../core/routes/BaseRoutes";
import { authAdmin, authAll } from "../../../middleware/AdminMiddleware";
import PitController from "../controller/PitController";


class PitRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAll, PitController.getPit )
        this.router.post('/store', authAdmin, PitController.storePit )
        // this.router.post( '/edit', authAdmin, VendorRepository.editData )
    }

}

export default new PitRoutes().router;
