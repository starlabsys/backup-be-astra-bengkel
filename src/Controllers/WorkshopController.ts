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
    
            const createWorkshop = await db.workshops.create({
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
            let { user_id, dealer_number,dealer_name, address, data_1, data_2, data_3 } = req.body;
            
            const id = req.params.id;

            const findWorkshop = await db.workshops.findOne({
                where: {
                    id
                }
            })

            if (!findWorkshop) {
                return res.status(404).json({
                    status: false,
                    message: "Workshop not found"
                })
            }
                
            const updateParts = await db.workshops.update({
                user_id,
                dealer_number,
                dealer_name,
                address,
                data_1: JSON.stringify(data_1),
                data_2,
                data_3,
            },{
                where: {
                    id
                }
            })
    
            await t.commit();
            
            return res.status(201).json({
                status: true,
                message: "Workshop updated successfully"
            });
            
        } catch (error) {
            t.rollback();
            return res.status(401).json({
                status : false,
                message: "Cant Update Workshop"
            })
        }
    }

    delete = async(req: Request, res: Response): Promise<Response> => {
        let t = await sequelize.transaction();

        try {
            let { id } = req.params;
    
            const deleteWorkshop = await db.workshops.destroy({
                where: {
                    id: id
                }
            })
    
            await t.commit();
            
            return res.status(201).json({
                status: true,
                message: "Workshops deleted successfully"
            });
            
        } catch (error) {
            t.rollback();
            return res.status(401).json({
                status : false,
                message: "Cant Delete Workshops"
            })
        }
    }
}

export default new WorkshopController();