import { Dialect } from "sequelize";


export interface InterfaceDataDB {
    development : InterfaceData;
    test? : InterfaceData;
    production : InterfaceData;
}

export interface InterfaceData {
    username : string;
    password : string;
    database : string;
    host : string;
    dialect : Dialect | undefined;
    port? : number;
    ssl? : boolean;
}

export class ConvertDataDB {
    public static toModelLogin( json : string ) : InterfaceDataDB {
        return JSON.parse( json );
    }

}

