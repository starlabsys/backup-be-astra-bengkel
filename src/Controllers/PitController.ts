import { Request, Response } from "express";
// import bcrypt from 'bcrypt';
// import Authentication from "../utils/Authentication";
import {Op} from "sequelize";

import { sequelize } from "../db/models";
import parts from "../db/models/parts";
import ResponseCode from "../utils/ResponseCode";
const db = require('../db/models');
const mysql2 = require('mysql2')

class PitController {
    index = async(req: any, res: Response) => {
        // 

        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        // 
        const offset = limit * page;

        try {
            const totalRows = await db.pit.count({
                where: {
                    [Op.or]: [{
                        kode_pit: {
                            [Op.like]: '%' + search + '%'
                        },
                    },{
                        tipe_pit: {
                            [Op.like]: '%' + search + '%'
                        }
                    }]
                }
            })
            console.log(totalRows);

            const totalPage = Math.ceil(totalRows / limit);

            const result = await db.pit.findAll({
                where: {
                    [Op.or]: [{
                        kode_pit: {
                            [Op.like]: '%' + search + '%'
                        },
                    },{
                        tipe_pit: {
                            [Op.like]: '%' + search + '%'
                        }
                    }]
                },

                limit: limit,
                offset: offset,
                order: [
                    ['kode_pit', 'ASC']
                ]
            })

            const data = {
                totalRows: totalRows,
                totalPage: totalPage,
                result
            }

            ResponseCode.successGet("Success Get Data", data, res);
            
        } catch (error) {
            ResponseCode.errorPost("Error Get Data", null , res);
        }

        // let data = await db.pit.findAll();

        // ResponseCode.successGet("Success Get Data", data, res);
    }

    store = async(req: Request, res: Response) => {

        let t = await sequelize.transaction();

        try {
            let {kode_pit, tipe_pit, is_active} = req.body;

            const findPit = await db.pit.findOne({
                where: {
                    kode_pit: kode_pit
                }
            });

            if (findPit) {
                ResponseCode.errorPost('Pit Already Exist', null, res);
            }
    
            const createParts = await db.pit.create({
                kode_pit,
                tipe_pit,
                is_active
            })
    
            await t.commit();
            
            ResponseCode.successPost("Success Create Data", createParts, res);
            
        } catch (error) {
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

export default new PitController();