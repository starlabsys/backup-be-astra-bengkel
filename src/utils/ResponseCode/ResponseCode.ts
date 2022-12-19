import express from 'express'
import { Response } from "express";

class ResponseCode {
    static OK = 200
    static CREATED = 201
    static BAD_REQUEST = 400
    static UNAUTHORIZED = 401
    static NOT_FOUND = 404
    static INTERNAL_SERVER_ERROR = 500

    static successGet = (messages: string, data: any, res: Response)=>
    {
        return res.status(200).json({
            status: true,
            message: messages,
            data: data
        })
    }

    static successPost = (messages: string, data: any, res: Response)=>{
        return res.status(201).json({
            status: true,
            message: messages,
        })
    }

    static errorPost = (messages: string, req: any, res: Response)=>{
        return res.status(400).json({
            status: false,
            message: messages,
        })
    }

    static unauthorized = (messages: string, req: any, res: Response)=>{
        return res.status(401).json({
            status: false,
            message: messages,
        })
    }
}

export default ResponseCode