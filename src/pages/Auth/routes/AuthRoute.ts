import BaseRoutes from "../../../core/routes/BaseRoutes";
import AuthController from "../controller/AuthController";


class AuthRoutes extends BaseRoutes {
    public routes() : void {
        this.router.post( '/login', AuthController.login );
    }
}

export default new AuthRoutes().router;
