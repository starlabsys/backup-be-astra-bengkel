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

    indexProvince = async(req: Request, res: Response) => {

        let { province, regency } = req.query;

        if (province == null && regency ==null) {
            let data = await db.province.findAll();
            
            ResponseCode.successGet("Success Get Data", data, res);

        }

        
        if (province && regency == null) {

            let dregency = await db.regencies.findAll({
                where: {
                    province_id: province
                }
            })

            ResponseCode.successGet("Success Get Data", dregency, res);

        }

        if (province && regency) {
            
            const dDistrict = await db.district.findAll({
                where: {
                    regency_id: regency
                }
            })
            
            ResponseCode.successGet("Success Get Data", dDistrict, res);
        }
        
    }

    indexRegency = async(req: Request, res: Response) => {
        let { regency } = req.query;

        
        if (regency == null) {

            // console.log('null');
            
            let dregency = await db.regencies.findAll({
                where: {
                    province_id: 61
                }
            })

            ResponseCode.successGet("Success Get Data", dregency, res);

        }

        if (regency) {
            // console.log('not null');
            
            const dDistrict = await db.district.findAll({
                where: {
                    regency_id: regency
                }
            })
            
            ResponseCode.successGet("Success Get Data", dDistrict, res);
        }
    }

    storeProvinces = async(req: Request, res: Response) => {

        const data = req.body;
        
        for(let i=0; i< data.length; i++){

            await db.province.create({
                id: data[i].id,
                name: data[i].name,
            })
        } 
    }
    storeRegencies = async(req: Request, res: Response) => {

        const data = req.body;
        
        for(let i=0; i< data.length; i++){

            await db.regencies.create({
                id: data[i].id,
                province_id: data[i].province_id,
                name: data[i].name,
            })
        }
        
        ResponseCode.successPost("Success Post Data", data, res);
    }
    storeDistrict = async(req: Request, res: Response) => {

        const data = req.body;
        
        for(let i=0; i< data.length; i++){

            await db.district.create({
                id: data[i].id,
                regency_id: data[i].regency_id,
                name: data[i].name,
            })
        }
        
        ResponseCode.successPost("Success Post Data", data, res);
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