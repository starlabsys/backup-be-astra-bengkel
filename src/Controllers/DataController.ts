import { Request, Response } from "express";
// import bcrypt from 'bcrypt';
// import Authentication from "../utils/Authentication";
import { sequelize } from "../db/models";
import ResponseCode from "../utils/ResponseCode";
const db = require('../db/models');
const mysql2 = require('mysql2')

class DataController {
    index = async(req: Request, res: Response) => {
        // 
        // let data = await db.sparepart.();
            let data = await db.Parts.findAll();



        ResponseCode.successGet("Success Get Data", data, res);
    }
    indexVehicle = async(req: Request, res: Response) => {
        // 
        // let data = await db.sparepart.();
            let data = await db.Motorcycle.findAll();



        ResponseCode.successGet("Success Get Data", data, res);
    }
    indexMechanic = async(req: Request, res: Response) => {
        // 
        // let data = await db.sparepart.();
            let data = await db.mechanic.findAll();



        ResponseCode.successGet("Success Get Data", data, res);
    }

    store = async(req: Request, res: Response) => {

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
            
            ResponseCode.successPost("Success Create Data", req, res);
            
        } catch (error) {
            t.rollback();
            ResponseCode.errorPost("Failed Create Data", req, res);
        }

    }
    update = async(req: Request, res: Response) => {
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
                ResponseCode.errorPost("Workshop Not Found", req, res);
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
            
            ResponseCode.successPost("Success Update Data", req, res);
            
        } catch (error) {
            t.rollback();
            ResponseCode.errorPost("Failed Update Data", req, res);
        }
    }

    delete = async(req: Request, res: Response) => {
        let t = await sequelize.transaction();

        try {
            let { id } = req.params;
    
            const deleteWorkshop = await db.workshops.destroy({
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

export default new DataController();