import BaseRoutes from "../../../core/routes/BaseRoutes";


class TestingRoute extends BaseRoutes {
  public routes() : void {
    this.router.get( '/testing', (req, res) => {
      res.status(200).json( { message: 'Testing' } );
    } );
  }
}

export default new TestingRoute().router;
