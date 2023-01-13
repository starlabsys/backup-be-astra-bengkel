import BaseRoutes from "../../../core/routes/BaseRoutes";
import AuthController from "../../Auth/controller/AuthController";
import AdminController from "../controller/AdminController";

// import AuthController from "../controller/AuthController";


class AdminRoute extends BaseRoutes {
    public routes() : void {
        this.router.get( '/admin', AdminController.listAdmin );
        this.router.post( '/admin', AdminController.registerAdmin );
        this.router.get( '/admin/:id', AdminController.detailAdmin );
        this.router.patch( '/admin/:id', AdminController.editAdmin );
        this.router.delete( '/admin/:id', AdminController.deleteAdmin );
        this.router.patch( '/change-password/:id', AdminController.changePassword );
    }
}

export default new AdminRoute().router;
