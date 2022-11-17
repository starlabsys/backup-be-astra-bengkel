import { Request, Response } from "express";
// import bcrypt from 'bcrypt';
// import Authentication from "../utils/Authentication";
import { sequelize } from "../db/models";
import parts from "../db/models/parts";
const db = require('../db/models');
const mysql2 = require('mysql2')

class WorkshopController {
    index = async(req: Request, res: Response): Promise<Response> => {
        // 
        let data = await db.workshops.findAll();

        return res.status(200).json({
            status: true,
            data: data
        })
    }

    store = async(req: Request, res: Response): Promise<Response> => {

        let t = await sequelize.transaction();

        try {
            let {user_id, dealer_number,dealer_name, address, data_1, data_2, data_3} = req.body;
    
            const createParts = await db.workshops.create({
                user_id,
                dealer_number,
                dealer_name,
                address,
                data_1: JSON.stringify(data_1),
                data_2,
                data_3,
            })
    
            await t.commit();
            
            return res.status(201).json({
                status: true,
                message: "Workshops created successfully"
            });
            
        } catch (error) {
            console.log(error);
            t.rollback();
            return res.status(401).json({
                status : false,
                message: "Cant Create Workshops"
            })
        }

    }
    update = async(req: Request, res: Response): Promise<Response> => {
        let t = await sequelize.transaction();

        try {
            let {parts_name, parts_qty, parts_price, parts_id } = req.body;
    
            const updateParts = await db.Parts.update({
                parts_name,
                parts_qty,
                parts_price,
            },{
                where: {
                    id: parts_id
                }
            })
    
            await t.commit();
            
            return res.status(201).json({
                status: true,
                message: "Parts updated successfully"
            });
            
        } catch (error) {
            t.rollback();
            return res.status(401).json({
                status : false,
                message: "Cant Update Parts"
            })
        }
    }

    delete = async(req: Request, res: Response): Promise<Response> => {
        let t = await sequelize.transaction();

        try {
            let { id } = req.params;
    
            const deleteParts = await db.Parts.destroy({
                where: {
                    id: id
                }
            })
    
            await t.commit();
            
            return res.status(201).json({
                status: true,
                message: "Parts deleted successfully"
            });
            
        } catch (error) {
            t.rollback();
            return res.status(401).json({
                status : false,
                message: "Cant Delete Parts"
            })
        }
    }
}

export default new WorkshopController();