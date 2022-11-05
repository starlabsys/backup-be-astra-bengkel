import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import Authentication from "../utils/Authentication";
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

        // console.log(req.body);
        
        let {username, password, role, name, name_dealer, dealer_number} = req.body;

        let findUser = await db.Users.findOne({where: {username: username}},{transaction: t});

        // console.log(findUser);
        
        if(findUser){
            return res.status(401).json({
                status : false,
                message: "Username already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        try {
            const createdUser = await db.Users.create({
                username,
                password: hashPassword,
                role
            },{transaction: t});

            let user_id = createdUser.id;

            // console.log(user_id);
            

            let createDetailUser = await db.DetailUsers.create({
                user_id,
                name,
                name_dealer,
                dealer_number,
            },{transaction: t})

            // console.log(createdOwner);
            
            await t.commit();
    
            return res.status(201).send({
                status: true,
                message: "User created successfully"
            });
            
        } catch (error) {

            console.log(error);
            
            await t.rollback();
            return res.status(401).send({
                status : false,
                message: "Cant Create User"
            });
        }
    }

    signin=async(req: Request, res: Response): Promise<Response> => {
        let {username, password} = req.body;



        try {
            const person = await db.Users.findOne({
                where: {
                    username: username
                }
            });
    
            if (!person) {
                return res.status(401).json({
                    status: false,
                    message: "User not found"
                });
            }
    
            const validPassword = await bcrypt.compare(password, person.password);
    
            if(!validPassword){
                return res.status(401).json({
                    status: false,
                    message: "Invalid Username & Password"
                })
            }
    
            const token = Authentication.generateToken(person.id, person.username, person.password, person.role);
    
            return res.status(201).json({
                status: true,
                message: "Login Success",
                data: {
                    person,
                    token
                }
            })    
            
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Connection Error"
            })
        }
    }

    profile = async(req: Request, res: Response): Promise<Response> => {
        let credential = req.app.locals.credential;
        return res.send(credential);
    }
}
export default new AuthController();