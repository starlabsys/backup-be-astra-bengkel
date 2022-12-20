import BaseRoutes from "../../../core/routes/BaseRoutes";
import JasaController from "../controller/JasaController";
import { authAdmin } from "../../../middleware/AdminMiddleware";
import { validatorRegister } from "../../../Validators/JasaValidator/JasaValidator";


class JasaRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAdmin, JasaController.getJasa );
        this.router.post( '/add', authAdmin, JasaController.addJasa )
        this.router.post( '/edit', validatorRegister, authAdmin, JasaController.editJasa );
        this.router.post( '/detail', authAdmin, JasaController.detailJasa );
        this.router.get( '/cetak', authAdmin, JasaController.cetakJasa );
    }
}

export default new JasaRoutes().router;
