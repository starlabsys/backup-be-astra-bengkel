import { Request, Response, NextFunction, response } from 'express';
import * as crypto from 'crypto';
import axios, { AxiosError, AxiosResponse } from 'axios'

class ApiService {
    // 

    

    // public static BaseApi = async (workshop_id: string, token: string){
    //     const url = 'https://astraapps.astra.co.id/dmsahassapi/';

    //     try{
    //         axios({
    //             method: 'get',
    //             url: 'https://jsonplaceholder.typicode.com/todos/1',
    //             // headers:{
    //             //     'Content-Type': 'application/json',
    //             //     'Authorization': token                    
    //             // },
    //             // data: {
    //             //     workshop_id: workshop_id
    //             // }
    //         }).then((value) =>{
    //             // console.log(value.data);
    //             var p_fromjson = JSON.parse(value.data)
    //             // return JSON.parse(value.data);
    //             Object.assign(p2, p_fromjson);
    //             return p_fromjson
    //             // return value.data;
    //         }).catch((err) => {
    //             console.log(err.message);
    //         })
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    // api =  async(req: Request, res: Response): Promise<Response> => {

    //     let result: AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

    //     return ({
    //         status: true,
    //     })
    // }

    // api = async(req: Request, res: Response)=> {
        
    //     // let result: AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    //     const baseUrl = "https://devproxy.astra.co.id/api_gateway/astra-api-developer/dmsahassapi-qa";
    //     const apiKey = "dgi-key-live:FC4827D4-E68C-4417-A609-8C79FA148D46"
    //     const secretKey = "dgi-secret-live:79681AA3-41B2-4034-AE01-505A3A380981"
    //     const day = new Date()
    //     const dateString = `${ day.getDate() } ${ day.toLocaleString( 'id', { month : 'short' } ) } ${ day.getFullYear() } ${ day.getHours() }:${ day.getMinutes() }:${ day.getSeconds() } (GMT+7/WIB)`
    //     const dayUnix = Math.floor( new Date( dateString ).getTime() / 1000 )
    //     const dataString = new TextEncoder().encode( apiKey + secretKey + dateString );
    //     const hashMac = crypto.createHash( "sha256" ).update( dataString ).digest( "hex" );

    //     let result = await axios.get('https://astraapps.astra.co.id/dmsahassapi/').then((response) => {
    //         console.log(response.data);
    //     }).catch((error) => {
    //         console.log(error.response);
    //         ;
    //     })

    //     // return res.status(200).json({
    //     //     status: true,
    //     //     result: result
    //     // })

    //     // console.log(result);
        

    // }
}

export default ApiService;