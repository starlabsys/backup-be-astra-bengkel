import BaseRoutes from "../../../core/routes/BaseRoutes";
import { authAdmin, authAll } from "../../../middleware/AdminMiddleware";
import PitMekanikController from "../controller/PitMekanikController";


class PitMekanikRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAll, PitMekanikController.getPitMekanik )
        this.router.post('/store', authAdmin, PitMekanikController.storePitMekanik )
        this.router.post('/test', PitMekanikController.test)
        // this.router.post('/detail', authAdmin, PitMekanikController.detailPitMekanik )
        // this.router.post( '/edit', authAdmin, VendorRepository.editData )
    }

}

export default new PitMekanikRoutes().router;
