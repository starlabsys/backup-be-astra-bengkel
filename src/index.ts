import express, { Application, Request, Response } from 'express';
import bodyParse from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import sequelizeConnection from "./config/config";
import AuthRoute from "./pages/Auth/routes/AuthRoute";
import JasaRoutes from "./pages/Jasa/routes/JasaRoutes";


class App {
    public app : Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins() : void {
        this.app.use( express.urlencoded() )
        this.app.use( express.json( { limit : "150mb" } ) )
        this.app.use( compression() );
        this.app.use( helmet() );
        // this.app.use(express.limit(100000000))
        // this.app.use(express.bodyParser({limit: '50mb'}));
        // this.app.use(express.bodyParser({limit: '50mb'}))
        this.app.use( cors(
            {
                origin : '*',
                methods : [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ],
                allowedHeaders : [ 'Content-Type', 'Authorization', 'Accept' ],
            }
        ) );
        // this.app.options( '*', cors( {
        //     origin : true,
        //     optionsSuccessStatus : 200,
        //     credentials : true,
        // } ) )
    }

    protected routes() : void {
        // console.log(process.env.NODE_ENV)
        this.app.route( "/" ).post( ( req : Request, res : Response ) => {
            return res.status( 200 ).json( {
                "message" : "success"
            } )
        } );

        this.app.use( "/api/auth", AuthRoute );
        this.app.use( "/api/jasa", JasaRoutes );

    }

}


const port : number = 8081;
const app = new App().app;

app.listen( port, () => {
    console.log( process.env.NODE_ENV );
    console.log( `Server is running on port ${ port }` );
    sequelizeConnection.authenticate()
                       .then( () => {
                           console.log( "Connection has been established successfully." );
                       } )
                       .catch( ( err : any ) => {
                           console.log( "Unable to connect to the database:", err );
                       } );
} )
