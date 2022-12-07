import { Request, Response } from "express";
// import bcrypt from 'bcrypt';
// import Authentication from "../utils/Authentication";
import {Op} from "sequelize";

import { sequelize } from "../db/models";
import parts from "../db/models/parts";
import service from "../db/models/service";
import ResponseCode from "../utils/ResponseCode";
const db = require('../db/models');
const mysql2 = require('mysql2')

class ServiceController {
    index = async(req: any, res: Response) => {
        // 

        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        // 
        const offset = limit * page;

        try{
            const totalRows = await db.service.count({
                where: {
                    [Op.or]: [{
                        service_name: {
                            [Op.like]: '%' + search + '%'
                        },
                    },{
                        service_code: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        group: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        sub_group: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        category_work: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        service_price: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        time_service: {
                            
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        time_range: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        service_note: {
                            [Op.like]: '%' + search + '%'
                        }
                    }]
                        
                }
            })

            const totalPage = Math.ceil(totalRows / limit);

            const result = await db.service.findAll({
                where: {
                    [Op.or]: [{
                        service_name: {
                            [Op.like]: '%' + search + '%'
                        },
                    },{
                        service_code: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        group: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        sub_group: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        category_work: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        service_price: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        time_service: {
                            
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        time_range: {
                            [Op.like]: '%' + search + '%'
                        }
                    },{
                        service_note: {
                            [Op.like]: '%' + search + '%'
                        }
                    }]
                },
                limit,
                offset,
                order: [
                    ['service_name', 'ASC']

                ],
            })

            const data = {
                totalRows,
                totalPage,
                result
            }


                    
            // const data = await db.service.findAll({})
            
            ResponseCode.successGet('Success Get Data', data, res);
        }catch(err){
            ResponseCode.errorPost('error Get Data', null, res);
        }

        
    }

    store = async(req: Request, res: Response) => {

        let t = await sequelize.transaction();

        try {
            let {
                service_code, 
                service_name,
                group,
                sub_group,
                category_work,
                service_price,
                time_service,
                time_range,
                service_note,
                commision_type,
                commision_percentage,
                commision_unit,
                parts
            } = req.body;
            
            const service_code_rand = 'SC00'+Math.random().toString(36).substring(2, 4).toUpperCase()+Date.now().toString(36).substring(2, 6).toUpperCase();

            const findService = await db.service.findOne({
                where: {
                    service_code: service_code == null || service_code == '' ? service_code_rand : service_code
                }
            });

            // console.log(findService);
            
            
            if (findService) {
                ResponseCode.errorPost('Service Code Already Exist', null, res);
            }

            // console.log(service_code_rand);
            

                
            const createdService = await db.service.create({
                service_code: service_code == null || service_code == '' ? service_code_rand : service_code, 
                service_name,
                group,
                sub_group,
                category_work,
                service_price,
                time_service,
                time_range,
                service_note,
                commision_type,
                commision_percentage,
                commision_unit,
            })

            if (parts.length > 0) {
                for (let i = 0; i < parts.length; i++) {
                    const element = parts[i];
                    const createdDetail = await db.detailservice.create({
                        service_id: createdService.id,
                        parts_id: element.parts_id,
                        qty: element.qty,
                    })
                }
            }
    
            await t.commit();
            
            ResponseCode.successPost("Success Create Data", null, res);
            
        } catch (error) {
            console.log(error);
            
            t.rollback();

            ResponseCode.errorPost("Error Create Data", error, res);
        }

    }
    update = async(req: Request, res: Response) => {
        let t = await sequelize.transaction();

        try {
            let {kode_pit, tipe_pit, is_active} = req.body;

            let id = req.params.id;

            const findPit = await db.pit.findOne({
                where: {
                    id
                }
            })

            if (!findPit) {
                ResponseCode.errorPost("Data Not Found", null, res)
            }

            await db.pit.update({
                kode_pit,
                tipe_pit,
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
    
            const deleteParts = await db.pit.destroy({
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

export default new ServiceController();