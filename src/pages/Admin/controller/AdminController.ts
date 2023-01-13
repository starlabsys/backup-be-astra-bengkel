import { Request, Response } from "express";
import ResponseResult from "../../../core/response/ResponseResult";
import { EnumResponseCode } from "../../../utils/enum/EnumResponseCode";
import ModelUsers from "../../../db/models/ModelUsers";
import Authentication from "../../../core/authentication/Authentication";


class AdminController {
    public listAdmin = async ( req : Request, res : Response ) : Promise<Response> => {
        try {
            const listAdmin = await ModelUsers.findAll( {
                where : {
                    deleted_at : null,
                }
            } );

            const dataToSend = listAdmin.map( ( admin ) => {
                return {
                    id : admin.id,
                    full_name : admin.full_name,
                    username : admin.username,
                    kode_bengkel : admin.kode_bengkel,
                    nama_bengkel : admin.nama_bengkel,
                    login_data : admin.login_data,
                    role : admin.role,
                    status : 'Active',
                    address : ''
                }
            } );

            return ResponseResult.successGet( res, dataToSend );

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                errorCode : "01",
                statusCode : EnumResponseCode.FORBIDDEN,
                message : e.message,
                data : null,
            } );
        }
    }

    public detailAdmin = async ( req : Request, res : Response ) : Promise<Response> => {
        const { id } = req.params;
        try {
            const listAdmin = await ModelUsers.findOne( {
                where : {
                    id : id,
                }
            } );

            const dataToSend = {
                id : listAdmin?.id,
                full_name : listAdmin?.full_name,
                username : listAdmin?.username,
                kode_bengkel : listAdmin?.kode_bengkel,
                nama_bengkel : listAdmin?.nama_bengkel,
                login_data : listAdmin?.login_data,
                role : listAdmin?.role,
                credential : listAdmin?.login_data,
                status : 'Active',
                address : ''
            }

            return ResponseResult.successGet( res, dataToSend );

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                errorCode : "01",
                statusCode : EnumResponseCode.FORBIDDEN,
                message : e.message,
                data : null,
            } );
        }
    }

    public registerAdmin = async ( req : Request, res : Response ) => {
        const { username, password, fullName, kodeBengkel, namaBengkel, role, loginData } = req.body;

        try {
            await ModelUsers.create( {
                username : username,
                password : await Authentication.passwordHash( password ),
                full_name : fullName,
                kode_bengkel : kodeBengkel,
                nama_bengkel : namaBengkel,
                role : role,
                login_data : loginData
            } );

            return ResponseResult.successPost( res, "Success Create Data" );

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : 500,
                errorCode : '01',
                message : e.toString(),
                data : null
            } )
        }


    }

    public editAdmin = async ( req : Request, res : Response ) => {
        const { username, fullName, kodeBengkel, namaBengkel, role, loginData } = req.body;
        const id = req.params.id;

        try {
            await ModelUsers.update( {
                username : username,
                full_name : fullName,
                kode_bengkel : kodeBengkel,
                nama_bengkel : namaBengkel,
                role : role,
                login_data : loginData
            }, {
                where : {
                    id : id
                }
            } );

            return ResponseResult.successPost( res, "Success Updated Data" );

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : 500,
                errorCode : '01',
                message : e.toString(),
                data : null
            } )
        }


    }

    public changePassword = async ( req : Request, res : Response ) => {
        const { password } = req.body;
        const id = req.params.id;

        try {
            const getUser = await ModelUsers.findOne( {
                where : {
                    id : id
                }
            } );

            const comparePassword = await Authentication.passwordCompare( password, getUser?.password ?? '' );

            if ( comparePassword ) {
                return ResponseResult.error( res, {
                    statusCode : EnumResponseCode.BAD_REQUEST,
                    errorCode : '01',
                    message : "Password tidak boleh sama dengan password lama",
                    data : null
                } )
            }
            await ModelUsers.update( {
                password : await Authentication.passwordHash( password ),
            }, {
                where : {
                    id : id
                }
            } );

            return ResponseResult.successPost( res, "Success Updated Password" );

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : 500,
                errorCode : '01',
                message : e.toString(),
                data : null
            } )
        }


    }

    public deleteAdmin = async ( req : Request, res : Response ) => {
        const id = req.params.id;

        try {
            await ModelUsers.update( {
                deleted_at : new Date()
            }, {
                where : {
                    id : id
                }
            } );

            // const data = await ModelUsers.findAll()

            return ResponseResult.successPost( res, "Success Delete Data" );
            // return ResponseResult.successGet( res, data );

        } catch ( e : any ) {
            return ResponseResult.error( res, {
                statusCode : 500,
                errorCode : '01',
                message : e.toString(),
                data : null
            } )
        }
    }
}

export default new AdminController()
