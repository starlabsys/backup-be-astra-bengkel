import { Sequelize } from "sequelize";
import { ConvertDataDB, InterfaceDataDB } from "./interfaceDatabase";
import dataJsonDB from '../config/database.json';


let sequelizeConnection : Sequelize;

const database = () : InterfaceDataDB => {
    // console.log( ConvertDataDB.toModelLogin( JSON.stringify( dataJsonDB ) ) )
    return ConvertDataDB.toModelLogin( JSON.stringify( dataJsonDB ) );
}
const dbDev = database().development;
const dbProd = database().production

if ( process.env.NODE_ENV == "development" ) {
    sequelizeConnection = new Sequelize( dbDev.database, dbDev.username, dbDev.password, {
        host : dbDev.host,
        port : dbDev.port,
        dialect : dbDev.dialect,
    } );

}
else {
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
