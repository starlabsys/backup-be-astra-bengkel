import ResponseResult from "../../../core/response/ResponseResult";
import { Request, Response } from "express";


class SparepartController {
    public getSparepart = async ( req : Request, res : Response ) : Promise<Response> => {
        return ResponseResult.error( res, {
            statusCode : 400,
            errorCode : '01',
            message : "Invalid Request",
            data : null
        } )
        // try {
        //     const sparepart = await ModelSparepart.findAll( {
        //         where : {
        //             status : 'active'
        //         }
        //     } );
        //     return json_format.success( res, {
        //         sparepart : sparepart
        //     } );
        // } catch ( e ) {
        //     return json_format.error( res, "01", {
        //         message : "Internal Error",
        //     } );
        // }
    }
}

export default new SparepartController();
