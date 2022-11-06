import { Request, Response } from "express";
import { sequelize } from "../db/models";
const db = require('../db/models');
const mysql2 = require('mysql2')

class VehicleController {
    index = async(req: Request, res: Response): Promise<Response> => {
        // 
        // console.log("test");

        try {
            let data = await db.Motorcycle.findAll();
    
            // res.send(data);
            console.log(data);
            
            return res.status(200).json({
                status: true,
                data: data
            })

        } catch (error) {
            return res.status(401).json({
                status: false,
                message: error
            })
        }
        
    }

    store = async(req: Request, res: Response): Promise<Response> => {

        let t = await sequelize.transaction();

        try {
            let {
                no_polisi,
                no_rangka,
                no_mesin,
                kode_tipe_unit,
                tahun_motor,
                informasi_bensin,
                km_terakhir,
                tipe_coming_customer,
            } = req.body;
    
            const createVehicle = await db.Motorcycle.create({
                no_polisi,
                no_rangka,
                no_mesin,
                kode_tipe_unit,
                tahun_motor,
                informasi_bensin,
                km_terakhir,
                tipe_coming_customer,
            })
    
            await t.commit();
            
            return res.status(201).json({
                status: true,
                message: "Vehice Has Been Created"
            });
            
        } catch (error) {
            t.rollback();
            return res.status(401).json({
                status : false,
                message: "Vehicle Cant Created"
            })
        }

    }
    update = async(req: Request, res: Response): Promise<Response> => {
        let t = await sequelize.transaction();

        try {
            let {parts_name, parts_qty, parts_price, parts_id,parts_code } = req.body;
    
            const updateParts = await db.Parts.update({
                parts_code,
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

export default new VehicleController();