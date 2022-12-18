import BaseRoutes from "../../../core/routes/BaseRoutes";
import JasaController from "../controller/JasaController";


class JasaRoutes extends BaseRoutes {
    routes() : void {
        this.router.post( '/get-jasa', JasaController.getJasa );
    }
}

export default new JasaRoutes().router;
