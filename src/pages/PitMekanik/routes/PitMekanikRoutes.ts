import BaseRoutes from "../../../core/routes/BaseRoutes";
import { authAdmin } from "../../../middleware/AdminMiddleware";
import PitMekanikController from "../controller/PitMekanikController";


class PitMekanikRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAdmin, PitMekanikController.getPitMekanik )
        this.router.post('/store', authAdmin, PitMekanikController.storePitMekanik )
        // this.router.post( '/edit', authAdmin, VendorRepository.editData )
    }

}

export default new PitMekanikRoutes().router;
