import { config as dotenv } from 'dotenv';
import { Sequelize } from "sequelize";
import { ConvertDataDB, InterfaceDataDB } from "./interfaceDatabase";
import dataJsonDB from '../config/database.json';


let sequelizeConnection : Sequelize;

const database = () : InterfaceDataDB => {
    return ConvertDataDB.toModelLogin( JSON.stringify( dataJsonDB ) );
}


if ( dotenv().parsed?.NODE_ENV == "development" ) {
    const dbDev = database().development;
    sequelizeConnection = new Sequelize( dbDev.database, dbDev.username, dbDev.password, {
        host : dbDev.host,
        port : dbDev.port,
        dialect : dbDev.dialect,
    } );

}
else {
    const dbProd = database().production
    sequelizeConnection = new Sequelize( dbProd.database, dbProd.username, dbProd.password, {
        host : dbProd.host,
        port : dbProd.port,
        username : dbProd.username,
        password : dbProd.password,
        database : dbProd.database,
        ssl : dbProd.ssl,
        dialect : dbProd.dialect,
    } );
}


export default sequelizeConnection;
