import { Request, Response } from "express";
import { sequelize } from "../db/models";
import ResponseCode from "../utils/ResponseCode";
const db = require('../db/models');
const mysql2 = require('mysql2')

class PitMechanicController {
    index = async(req: Request, res: Response) => {
        // 
        let data = await db.pitmechanic.findAll();

        ResponseCode.successGet("Success Get Data", data, res);
    }

    store = async(req: Request, res: Response) => {

        let t = await sequelize.transaction();

        try {
            let {pit_id, mechanic_id, is_active} = req.body;

            const findPit = await db.pit.findOne({
                where: {
                    id: pit_id
                }
            })

            if (!findPit) {
                ResponseCode.errorPost('Pit Not Found', null, res);
            }

            const findMechanic = await db.mechanic.findOne({
                where: {
                    id: mechanic_id
                }
            })

            if(!findMechanic){
                ResponseCode.errorPost('Mechanic Not Found', null, res);
            }
    
            const createPitMc = await db.pitmechanic.create({
                pit_id,
                mechanic_id,
                is_active
            })
    
            await t.commit();
            
            ResponseCode.successPost("Success Create Data", createPitMc, res);
            
        } catch (error) {
            t.rollback();

            ResponseCode.errorPost("Error Create Data", error, res);
        }

    }
    update = async(req: Request, res: Response) => {
        let t = await sequelize.transaction();

        try {
            let {pit_id, mechanic_id, is_active} = req.body;

            let id = req.params.id;

            const findPitMechanic = await db.pitmechanic.findOne({
                where: {
                    id
                }
            })

            if (!findPitMechanic) {
                ResponseCode.errorPost("Pit Mechanic Not Found", null, res)
            }

            const findPit = await db.pit.findOne({
                where: {
                    id: pit_id
                }
            })

            if (!findPit) {
                ResponseCode.errorPost('Pit Not Found', null, res);
            }

            const findMechanic = await db.mechanic.findOne({
                where: {
                    id: mechanic_id
                }
            })

            if(!findMechanic){
                ResponseCode.errorPost('Mechanic Not Found', null, res);
            }

            await db.pitmechanic.update({
                pit_id,
                mechanic_id,
                is_active
            },{
                where: {
                    id
                }
            })
    
            await t.commit();
            
            ResponseCode.successPost("Success Update Data", null, res);
            
        } catch (error) {
            t.rollback();

            ResponseCode.errorPost("Error Update Data", error, res);
        }
    }

    destroy = async(req: Request, res: Response) => {
        let t = await sequelize.transaction();

        try {
            let { id } = req.params;

            const findPitMechanic = await db.pitmechanic.findOne({
                where: {
                    id
                }
            })

            if (!findPitMechanic) {
                ResponseCode.errorPost("Pit Mechanic Not Found", null, res)
            }
    
            const deleteParts = await db.pitmechanic.destroy({
                where: {
                    id: id
                }
            })
    
            await t.commit();
            
            ResponseCode.successPost("Success Delete Data", deleteParts, res);
            
        } catch (error) {
            t.rollback();

            ResponseCode.errorPost("Error Delete Data", error, res);
        }
    }
}

export default new PitMechanicController();