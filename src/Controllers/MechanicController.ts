import { Request, Response } from "express";
import { sequelize } from "../db/models";
import ResponseCode from "../utils/ResponseCode";
const db = require('../db/models');
const mysql2 = require('mysql2')

class MechanicController {
    index = async(req: Request, res: Response) => {
        // 
        let data = await db.mechanic.findAll();

        ResponseCode.successGet("Success Get Data", data, res);
    }

    store = async(req: Request, res: Response) => {

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
            
            ResponseCode.successPost("Success Create Data", req, res);
            
        } catch (error) {
            // console.log(error);
            t.rollback();
            
            ResponseCode.errorPost("Failed Create Data", req, res);
        }

    }
    update = async(req: Request, res: Response) => {
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
                
                ResponseCode.errorPost("Mechanic not found", req, res);
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
            
            ResponseCode.successPost("Mechanic updated successfully", req, res);
            
        } catch (error) {
            t.rollback();
            ResponseCode.errorPost("Failed Update Data", req, res);
        }
    }

    delete = async(req: Request, res: Response) => {
        let t = await sequelize.transaction();

        try {
            let { id } = req.params;
    
            const deleteWorkshop = await db.mechanic.destroy({
                where: {
                    id: id
                }
            })
    
            await t.commit();

            ResponseCode.successPost("Success Delete Data", req, res);
            
        } catch (error) {
            t.rollback();

            ResponseCode.errorPost("Failed Delete Data", req, res);
        }
    }
}

export default new MechanicController();