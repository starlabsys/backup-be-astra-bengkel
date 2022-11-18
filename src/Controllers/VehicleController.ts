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
            let {no_polisi,
                no_rangka,
                no_mesin,
                kode_tipe_unit,
                tahun_motor,
                informasi_bensin,
                km_terakhir,
                tipe_coming_customer } = req.body;

                let id = req.params.id;

            let findVehicle = await db.Motorcycle.findOne({
                where: {
                    id
                }
            });

            if (!findVehicle) {
                return res.status(401).json({
                    status: false,
                    message: Object("Vehicle Not Found")
                })
            }
                
            const updateParts = await db.Motorcycle.update({
                no_polisi,
                no_rangka,
                no_mesin,
                kode_tipe_unit,
                tahun_motor,
                informasi_bensin,
                km_terakhir,
                tipe_coming_customer,
            },{
                where: {
                    id
                }
            })
    
            await t.commit();
            
            return res.status(201).json({
                status: true,
                message: Object("Vehicle updated successfully")
            });
            
        } catch (error) {
            t.rollback();
            return res.status(401).json({
                status : false,
                message: Object("Cant Update Vehicle")
            })
        }
    }

    delete = async(req: Request, res: Response): Promise<Response> => {
        let t = await sequelize.transaction();

        try {
            let { id } = req.params;

            let findVehicle = await db.Motorcycle.findOne({
                where: {
                    id
                }
            })

            if (!findVehicle) {
                return res.status(401).json({
                    status: false,
                    message: Object("Vehicle Not Found")
                })
            }
    
            const deleteParts = await db.Motorcycle.destroy({
                where: {
                    id
                }
            })
    
            await t.commit();
            
            return res.status(201).json({
                status: true,
                message: "Vehicle deleted successfully"
            });
            
        } catch (error) {
            t.rollback();
            return res.status(401).json({
                status : false,
                message: "Cant Delete Vehicle"
            })
        }
    }
}

export default new VehicleController();