import { Request, Response } from "express";
import { sequelize } from "../db/models";
import {Op} from "sequelize";
import ResponseCode from "../utils/ResponseCode";
const db = require('../db/models');
const mysql2 = require('mysql2')

class VehicleController {
    index = async(req: any, res: Response) => {

        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        // 
        // console.log(req.query.page+" "+req.query.limit+" "+req.query.search);
        const offset = limit * page;

        // console.log(search);
        
        
        try {
            const totalRows = await db.Motorcycle.count({
                where:{
                    [Op.or]: [{no_polisi:{
                        [Op.like]: '%'+search+'%'
                    }},{no_rangka:{
                        [Op.like]: '%'+search+'%'
                    }},{no_mesin:{
                        [Op.like]: '%'+search+'%'
                    }},{kode_tipe_unit:{
                        [Op.like]: '%'+search+'%'
                    }},{tahun_motor:{
                        [Op.like]: '%'+search+'%'
                    }},{informasi_bensin:{
                        [Op.like]: '%'+search+'%'
                    }},{km_terakhir:{
                        [Op.like]: '%'+search+'%'
                    }}, {tipe_coming_customer:{
                        [Op.like]: '%'+search+'%'
                    }}],
                }
            }); 

            console.log(totalRows);
            
    
            const totalPage = Math.ceil(totalRows / limit);

            const result = await db.Motorcycle.findAll({
                where: {
                    [Op.or]: [{no_polisi:{
                        [Op.like]: '%'+search+'%'
                    }},{no_rangka:{
                        [Op.like]: '%'+search+'%'
                    }},{no_mesin:{
                        [Op.like]: '%'+search+'%'
                    }},{kode_tipe_unit:{
                        [Op.like]: '%'+search+'%'
                    }},{tahun_motor:{
                        [Op.like]: '%'+search+'%'
                    }},{informasi_bensin:{
                        [Op.like]: '%'+search+'%'
                    }},{km_terakhir:{
                        [Op.like]: '%'+search+'%'
                    }}, {tipe_coming_customer:{
                        [Op.like]: '%'+search+'%'
                    }}],
                },
                offset: offset,
                limit: limit,
                order:[
                    ['id', 'DESC']
                ]
            });

            // console.log(result.length);
            

            // console.log(result);
            const data = {
                totalRows,
                totalPage,
                result
            }
            
            // let data = await db.Motorcycle.findAll();

            ResponseCode.successGet("Success Get Data", data, res);
            
        } catch (error) {
            console.log(error);
            ResponseCode.errorPost("Failed Get Data", error, res);
        }
        
    }

    store = async(req: Request, res: Response) => {

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

            let findVehicle = await db.Motorcycle.findOne({
                where: {
                    no_mesin,
                    no_rangka,
                }
            });

            if (findVehicle) {
                ResponseCode.errorPost("Vehicle Already Exist", req, res);
            }
    
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
            
            ResponseCode.successPost("Success Create Data", req, res);
            
        } catch (error) {
            t.rollback();
            ResponseCode.errorPost("Failed Create Data", error, res);
        }

    }
    update = async(req: Request, res: Response) => {
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
                ResponseCode.errorPost("Data Not Found", req, res);
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

            ResponseCode.successPost("Success Update Data", req, res);
            
            
        } catch (error) {
            t.rollback();

            ResponseCode.errorPost("Failed Update Data", error, res);
        }
    }

    delete = async(req: Request, res: Response) => {
        let t = await sequelize.transaction();

        try {
            let { id } = req.params;

            let findVehicle = await db.Motorcycle.findOne({
                where: {
                    id
                }
            })

            if (!findVehicle) {
                ResponseCode.successGet("Data Not Found", req, res);
            }
    
            const deleteParts = await db.Motorcycle.destroy({
                where: {
                    id
                }
            })
    
            await t.commit();
            
            ResponseCode.successPost("Success Delete Data", req, res);
            
        } catch (error) {
            t.rollback();
            ResponseCode.errorPost("Failed Delete Data", error, res);
        }
    }
}

export default new VehicleController();