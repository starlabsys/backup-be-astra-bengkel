import { Request, Response } from "express";
// import bcrypt from 'bcrypt';
// import Authentication from "../utils/Authentication";
import { sequelize } from "../db/models";
import axios, { AxiosResponse } from "axios";
import crypto from 'crypto'

import apiService from "../Services/ApiService";
import ResponseCode from "../utils/ResponseCode";
import {Op} from "sequelize";

// import parts from "../db/models/parts";
const db = require('../db/models');
const mysql2 = require('mysql2')

class PartsController {
    index = async (req: any, res: Response) => {
        // 
        // console.log("test");

        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        // 
        const offset = limit * page;

        console.log(offset);
        
        try {

            // let data = await db.Parts.findAll();

            const totalRows = await db.Parts.count({
                where: {
                    [Op.or]: [{
                        parts_code: {
                            [Op.like]: '%' + search + '%'
                        },
                    
                    },{
                        parts_name: {
                            [Op.like]: '%' + search + '%'
                        },
                        
                    },{
                        parts_qty: {
                            [Op.like]: '%' + search + '%'
                        },
                        
                    },{
                        parts_price: {
                            [Op.like]: '%' + search + '%'
                        },
                    }]
                }
            })
            
            const totalPage = Math.ceil(totalRows / limit);

            const result = await db.Parts.findAll({
                where: {
                    [Op.or]: [
                        {
                        parts_code: {
                            [Op.like]: '%' + search + '%'
                        },
                    
                    },{
                        parts_name: {
                            [Op.like]: '%' + search + '%'
                        },
                        
                    },{
                        parts_qty: {
                            [Op.like]: '%' + search + '%'
                        },
                        
                    },{
                        parts_price: {
                            [Op.like]: '%' + search + '%'
                        },
                    }
                    ]
                },
                limit: limit,
                offset: offset,
                // order: [
                //     ['parts_name', 'ASC']
                // ]

            })

            const data = {
                totalRows,
                totalPage,
                result
            }

            // console.log(data);
            

            ResponseCode.successGet("Success Get Data", data, res);
        } catch (error) {
            ResponseCode.errorPost("Failed Get Data", null, res);
        }

    }

    store = async (req: Request, res: Response) => {

        let t = await sequelize.transaction();

        try {
            let { parts_code, parts_name, parts_qty, parts_price } = req.body;

            const createParts = await db.Parts.create({
                parts_code,
                parts_name,
                parts_qty,
                parts_price,
            })

            await t.commit();

            ResponseCode.successPost("Success Create Data", req, res);

        } catch (error) {
            t.rollback();

            ResponseCode.errorPost("Failed Create Data", req, res);
        }

    }

    update = async (req: Request, res: Response) => {
        let t = await sequelize.transaction();

        try {
            let { parts_name, parts_qty, parts_price, parts_id, parts_code } = req.body;

            const updateParts = await db.Parts.update({
                parts_code,
                parts_name,
                parts_qty,
                parts_price,
            }, {
                where: {
                    id: parts_id
                }
            })

            await t.commit();

            ResponseCode.successPost("Success Update Data", req, res);

        } catch (error) {
            t.rollback();

            ResponseCode.errorPost("Failed Update Data", req, res);
        }
    }

    delete = async (req: Request, res: Response) => {
        let t = await sequelize.transaction();

        try {
            let { id } = req.params;

            const deleteParts = await db.Parts.destroy({
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

    test = async (req: Request, res: Response) => {

        const baseUrl = "https://astraapigc.astra.co.id/dmsahassapi/dgi-api/v2/spk/read";
        const apiKey = "dgi-key-live:FC4827D4-E68C-4417-A609-8C79FA148D46"
        const secretKey = "dgi-secret-live:79681AA3-41B2-4034-AE01-505A3A380981"
        const day = new Date()
        const dateString = `${day.getDate()} ${day.toLocaleString('id', { month: 'short' })} ${day.getFullYear()} ${day.getHours()}:${day.getMinutes()}:${day.getSeconds()} (GMT+7/WIB)`
        const dayUnix = Math.floor(new Date(dateString).getTime() / 1000)

        const dataString = new TextEncoder().encode(apiKey + secretKey + dayUnix);
        const hashMac = crypto.createHash("sha256").update(dataString).digest("hex");

        const data = {
            
        }
        console.log(dayUnix+" - "+apiKey+" - "+hashMac)
        const headers = {
            // 'Authorization': `Basic ${basic}`,
            'Content-Type': 'application/json',
            'X-Request-Time': dayUnix,
            'DGI-Api-Key' : apiKey,
            'DGI-API-Token' : hashMac
        }

        const AxiosResponse = await axios.post(baseUrl, data, {
            headers: headers
        
        }).then((response) => {
            console.log(response.data);
            return res.status(200).json({
                status: true,
                data: response.data
            });
        }).catch((error) => {
            console.log(error.response.data);
            
            return res.status(401).json({
                status: false,
                // data: hashMac,
                // tgl:dayUnix,
                message: error.response.data
            })
        })

        // console.log(result.data);
        // return res.status(200).json({
        //     data: 'esult.dat'
        // })

    }

    excel = async (req: Request, res: Response) => {
        // let req.body;
        let data = req.body

        let t = sequelize.transaction();
        // 
        for(let i=0; i< data.length; i++){
            // console.log(data[i][`Kota/Kabupaten`]); //use i instead of 0
            console.log(data[i][`No Mesin`]); //use i instead of 0
            const findVehicle = await db.Motorcycle.findOne({
                where: {
                    no_mesin: data[i][`No Mesin`],
                    no_rangka: data[i][`No Rangka`]
                }
            });

            // console.log(findVehicle);
            

            if (!findVehicle) {
                const createVehicle = await db.Motorcycle.create({
                    no_polisi: "KB8821HF",
                    kode_tipe_unit: "A",
                    tahun_motor: data[i][`Tahun Rakit`],
                    informasi_bensin: '1',
                    km_terakhir: 12982,
                    tipe_coming_customer: "1",
                    no_mesin: data[i][`No Mesin`],
                    no_rangka: data[i][`No Rangka`],
                })
            }
        } 

        ResponseCode.successPost("Success Upload Data", req, res);

    }
}

export default new PartsController();