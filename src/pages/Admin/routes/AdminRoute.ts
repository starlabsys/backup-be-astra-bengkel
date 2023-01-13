import BaseRoutes from "../../../core/routes/BaseRoutes";
import AuthController from "../../Auth/controller/AuthController";
import AdminController from "../controller/AdminController";

// import AuthController from "../controller/AuthController";


class AdminRoute extends BaseRoutes {
    public routes() : void {
        this.router.get( '/admin', AdminController.listAdmin );
        this.router.post( '/admin', AdminController.registerAdmin );
        this.router.put( '/admin/:id', AdminController.editAdmin );
        this.router.delete( '/admin/:id', AdminController.deleteAdmin );
    }
}

export default new AdminRoute().router;
