import BaseRoutes from "../../../core/routes/BaseRoutes";
import JasaController from "../controller/JasaController";
import { authAdmin } from "../../../middleware/AdminMiddleware";
import { jasaValidator } from "../validator/JasaValidator";


class JasaRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get', authAdmin, JasaController.getJasa );
        this.router.post( '/add', jasaValidator, authAdmin, JasaController.addJasa )
        this.router.post( '/edit', jasaValidator, authAdmin, JasaController.editJasa );
        this.router.post( '/detail', authAdmin, JasaController.detailJasa );
        this.router.get( '/cetak', authAdmin, JasaController.cetakJasa );
    }
}

export default new JasaRoutes().router;
