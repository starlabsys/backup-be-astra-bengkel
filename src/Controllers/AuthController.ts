import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import Authentication from "../utils/Authentication";
import mysql from 'mysql2';
import { sequelize } from "../db/models";
const db = require('../db/models');
const mysql2 = require('mysql2')

// const DB: any = db;
// const { users } = DB;

class AuthController {
    signup = async(req: Request, res: Response): Promise<Response> => {
        // throw new Error('Method not implemented.');
        // return res.send("Auth Index");
        const t = await sequelize.transaction();

        let {email, password, roles,owner_name, owner_address, owner_phone, owner_identity, path_image} = req.body;

        let findEmail = await db.users.findOne({where: {email: email}},{transaction: t});

        if(findEmail){
            return res.send('Email already exists');
        }

        // res.send(password);

        const hashPassword = await bcrypt.hash(password, 10);

        try {
            const createdUser = await db.users.create({
                email,
                password: hashPassword,
                roles
            },{transaction: t});

            let user_id = createdUser.id;

            // console.log(user_id);
            

            let createdOwner = await db.Owners.create({
                user_id,
                owner_name,
                owner_address,
                owner_phone,
                owner_identity,
                path_image,
            },{transaction: t})

            // console.log(createdOwner);
            
            await t.commit();
    
            return res.status(201).send({
                status: true,
                message: "User created successfully"
            });
            
        } catch (error) {

            await t.rollback();
            return res.status(401).send({
                status : false,
                message: "Cant Create User"
            });
        }
    }

    signin=async(req: Request, res: Response): Promise<Response> => {
        // res.send('signin');
        let {email, password} = req.body;

        // console.log(email);
        
        const person = await db.users.findOne({
            where: {
                email: email
            }
        });

        if (!person) {
            return res.send("User not found");
        }

        const validPassword = await bcrypt.compare(password, person.password);

        if(!validPassword){
            return res.send("Invalid password");
        }

        const token = Authentication.generateToken(person.id, person.email, person.password, person.roles);

        return res.send({
            person,
            token
        })
    }

    profile = async(req: Request, res: Response): Promise<Response> => {
        let credential = req.app.locals.credential;
        return res.send(credential);
    }
}
export default new AuthController();