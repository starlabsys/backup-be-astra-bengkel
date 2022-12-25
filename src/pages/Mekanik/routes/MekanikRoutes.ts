import BaseRoutes from "../../../core/routes/BaseRoutes";
import MekanikController from "../controller/MekanikController";
import { authAdmin } from "../../../middleware/AdminMiddleware";

class MekanikRoutes extends BaseRoutes{
    routes() : void {
        this.router.post( '/get', authAdmin, MekanikController.getMekanik )
        this.router.post('/store', authAdmin, MekanikController.storeMekanik)
    }
}

export default new MekanikRoutes().router;