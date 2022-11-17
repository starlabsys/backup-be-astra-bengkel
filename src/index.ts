import express, { Application, Request, Response } from 'express';
import bodyParse from 'body-parser';
// import morgan from 'morgan'
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import AuthRoutes from './Routes/AuthRoutes';
import PartsRoutes from './Routes/PartsRoutes';
import PkbRoutes from './Routes/PkbRoutes';
import VehicleRoutes from './Routes/VehicleRoutes';
// import WorkshopRoutes from './Routes/WorkshopRoutes';


class App {
    public app : Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins() : void {
        this.app.use( bodyParse.json() );
        // this.app.use(bodyParse.urlencoded({extended: false}));
        // this.app.use(morgan('dev'));
        this.app.use( compression() );
        this.app.use( helmet() );
        this.app.use( cors(
            {

                allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
                exposedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
                origin: '*',
                methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
                preflightContinue: false,
                optionsSuccessStatus: 204

                // origin : 'http://localhost:3000',
                // credentials : true,
                // // access-control-allow-origin : '*,http://localhost:3000',
                // methods : 'GET,PUT,PATCH,POST,DELETE',
                // allowedHeaders : 'Content-Type, Authorization, Origin, X-Requested-With, Accept',
                // preflightContinue : false,
                // optionsSuccessStatus : 204
            }
        ) );
    }

    protected routes() : void {
        this.app.route( "/" ).get( ( req : Request, res : Response ) => {
            return res.status( 200 ).json( {
                "message" : "success"
            } )
        } );
        this.app.use( '/api/auth', cors(), AuthRoutes );
        this.app.use( '/api/parts', cors(),PartsRoutes );
        this.app.use( '/api/pkb', cors(), PkbRoutes );
        this.app.use('/api/vehicle', cors(), VehicleRoutes )
        // this.app.use('/api/workshop', cors(), WorkshopRoutes )

    }

}

const port : number = 8080;
const app = new App().app;

app.listen( port, () => {
    console.log( `Server is running on port ${ port }` );
} )
