import BaseRoutes from "../../../core/routes/BaseRoutes";
import MekanikController from "../controller/MekanikController";
import { authAdmin, authAll } from "../../../middleware/AdminMiddleware";

class MekanikRoutes extends BaseRoutes{
    routes() : void {
        this.router.post( '/get', authAll, MekanikController.getMekanik )
        this.router.post('/store', authAdmin, MekanikController.storeMekanik)
    }
}

export default new MekanikRoutes().router;