import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import Authentication from "../utils/Authentication";
import { sequelize } from "../db/models";
// import CryptoJS from "crypto-js";
import crypto from "crypto"
// import { Axios } from "axios";
import axios from "axios";



const db = require( '../db/models' );
const mysql2 = require( 'mysql2' )

// const DB: any = db;
// const { users } = DB;

class AuthController {
    signup = async ( req : Request, res : Response ) : Promise<Response> => {
        // throw new Error('Method not implemented.');
        // return res.send("Auth Index");
        const t = await sequelize.transaction();

        // console.log(req.body);

        let { username, password, role, name, name_dealer, dealer_number } = req.body;

        let findUser = await db.Users.findOne( { where : { username : username } }, { transaction : t } );

        // console.log(findUser);

        if ( findUser ) {
            return res.status( 401 ).json( {
                status : false,
                message : "Username already exists"
            } );
        }

        const hashPassword = await bcrypt.hash( password, 10 );

        try {
            const createdUser = await db.Users.create( {
                username,
                password : hashPassword,
                role
            }, { transaction : t } );

            let user_id = createdUser.id;

            // console.log(user_id);


            let createDetailUser = await db.DetailUsers.create( {
                user_id,
                name,
                name_dealer,
                dealer_number,
            }, { transaction : t } )

            // console.log(createdOwner);

            await t.commit();

            return res.status( 201 ).send( {
                status : true,
                message : "User created successfully"
            } );

        } catch ( error ) {

            console.log( error );

            await t.rollback();
            return res.status( 401 ).send( {
                status : false,
                message : "Cant Create User"
            } );
        }
    }

    signin = async ( req : Request, res : Response ) : Promise<Response> => {
        let { username, password } = req.body;

        try {
            const person = await db.Users.findOne( {
                where : {
                    username : username
                }
            } );

            if ( !person ) {
                return res.status( 401 ).json( {
                    status : false,
                    message : "User not found"
                } );
            }

            const validPassword = await bcrypt.compare( password, person.password );

            if ( !validPassword ) {
                return res.status( 401 ).json( {
                    status : false,
                    message : "Invalid Username & Password"
                } )
            }

            const token = Authentication.generateToken( person.id, person.username, person.password, person.role );

            return res.status( 201 ).json( {
                status : true,
                message : "Login Success",
                data : {
                    person,
                    token
                }
            } )

        } catch ( error ) {
            return res.status( 400 ).json( {
                status : false,
                message : error
            } )
        }
    }

    profile = async ( req : Request, res : Response ) : Promise<Response> => {
        let credential = req.app.locals.credential;
        return res.send( credential );
    }

    test = async(req: Request, res: Response) => {

        // const date = new Date();
        const DateN = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
        const timeStamp = Math.floor(new Date(DateN).getTime() / 1000);

         const day = new Date()
        const dateString = `${ day.getDate() } ${ day.toLocaleString( 'id', { month : 'short' } ) } ${ day.getFullYear() } ${ day.getHours() }:${ day.getMinutes() }:${ day.getSeconds() } (GMT+7/WIB)`
        const dayUnix = Math.floor( new Date( dateString ).getTime() / 1000 )
        // console.log(timeStamp+" / " +dayUnix);
        
        const apiKey = "dgi-key-live:52ADFCEE-18BE-470E-9772-4E76EB0CDF00";
        const secretKey = "dgi-secret-live:15C06B55-B31C-4A1C-BC23-085C23504F28"
        const cry = crypto.createHash('sha256').update(apiKey+secretKey+timeStamp).digest('hex');
        const cry1 = crypto.createHash('sha256').update(apiKey+secretKey+dayUnix).digest('hex');
        // console.log(cry+" / "+cry1);
        

        try{
            const data = await axios.post('https://astraapps.astra.co.id/dmsahassapi/dgi-api/v2/spk/read',{
                "fromTime" : "2022-08-01 00:00:00",
                "toTime" : "2022-08-04 23:59:59",
                "dealerId" : "07533",
                "deliveryDocumentId" : "",
                "idSPK" : "",
                "idCustomer" : ""
            }, {headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-Request-Time': timeStamp,
                    'DGI-API-Key': apiKey,
                    'DGI-API-Token': cry
                }
            })
            res.send(data.data);

        }catch(error){
            console.log(error);
        }
        // console.log(data);
        
        // CryptoJS.HmacSHA256(apiKey + secretKey + timeStamp);
    }
}

export default new AuthController();
