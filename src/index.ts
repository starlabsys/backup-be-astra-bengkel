import express, {Application , Request, Response } from 'express';
import bodyParse from 'body-parser';
import morgan from 'morgan'
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import {config as dotenv} from 'dotenv';
import AuthRoutes from './Routes/AuthRoutes';

class App {
    public app: Application;

    constructor(){
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins():void{
        this.app.use(bodyParse.json());
        // this.app.use(bodyParse.urlencoded({extended: false}));
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes(): void{
        this.app.use('/api/auth', AuthRoutes);
    }

}

const port: number = 3030;
const app = new App().app;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
})