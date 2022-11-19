import { Request, Response } from "express";
import { sequelize } from "../db/models";
const db = require('../db/models');
const mysql2 = require('mysql2')

class MechanicController {
    index = async(req: Request, res: Response): Promise<Response> => {
        // 
        let data = await db.mechanic.findAll();

        return res.status(200).json({
            status: true,
            data: data
        })
    }

    store = async(req: Request, res: Response): Promise<Response> => {

        let t = await sequelize.transaction();

        try {
            let {
                workshop_id,
                mechanic_name,
                mechanic_number,
                mechanic_gender,
                mechanic_phone,
                mechanic_address,
            } = req.body;
    
            const createWorkshop = await db.mechanic.create({
                workshop_id,
                mechanic_name,
                mechanic_number,
                mechanic_gender,
                mechanic_phone,
                mechanic_address,
            })
    
            await t.commit();
            
            return res.status(201).json({
                status: true,
                message: "Mechanic created successfully"
            });
            
        } catch (error) {
            console.log(error);
            t.rollback();
            return res.status(401).json({
                status : false,
                message: "Cant Create Mechanic"
            })
        }

    }
    update = async(req: Request, res: Response): Promise<Response> => {
        let t = await sequelize.transaction();

        try {
            let { 
                workshop_id,
                mechanic_name,
                mechanic_number,
                mechanic_gender,
                mechanic_phone,
                mechanic_address,
             } = req.body;
            
            const id = req.params.id;

            const findMechanic = await db.mechanic.findOne({
                where: {
                    id
                }
            })

            if (!findMechanic) {
                return res.status(404).json({
                    status: false,
                    message: "Mechanic not found"
                })
            }
                
            const updateMechanic = await db.mechanic.update({
                workshop_id,
                mechanic_name,
                mechanic_number,
                mechanic_gender,
                mechanic_phone,
                mechanic_address,
            },{
                where: {
                    id
                }
            })
    
            await t.commit();
            
            return res.status(201).json({
                status: true,
                message: "Mechanic updated successfully"
            });
            
        } catch (error) {
            t.rollback();
            return res.status(401).json({
                status : false,
                message: "Cant Update Mechanic"
            })
        }
    }

    delete = async(req: Request, res: Response): Promise<Response> => {
        let t = await sequelize.transaction();

        try {
            let { id } = req.params;
    
            const deleteWorkshop = await db.mechanic.destroy({
                where: {
                    id: id
                }
            })
    
            await t.commit();
            
            return res.status(201).json({
                status: true,
                message: "Mechanic deleted successfully"
            });
            
        } catch (error) {
            t.rollback();
            return res.status(401).json({
                status : false,
                message: "Cant Delete Mechanic"
            })
        }
    }
}

export default new MechanicController();