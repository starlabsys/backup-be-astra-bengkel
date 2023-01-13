import { DataTypes, Model } from "sequelize";
import db from "../../config/config";


class ModelUsers extends Model {
    id? : bigint;
    username? : string;
    password? : string;
    full_name? : string;
    kode_bengkel? : string;
    nama_bengkel? : string;
    role? : string;
    token? : string;
    login_data? : string;
    deleted_at? : Date;
}

ModelUsers.init( {
    id : {
        type : DataTypes.BIGINT,
        autoIncrement : true,
        primaryKey : true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    full_name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    kode_bengkel : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    nama_bengkel : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    role : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    token : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    login_data : {
        type : DataTypes.TEXT,
        allowNull : false,
    },
    duration : {
        type : DataTypes.DATE,
        allowNull : true
    },
    deleted_at : {
        type : DataTypes.DATE,
        allowNull : true
    }
}, {
    sequelize : db,
    modelName : "Users",
    tableName : "tb_users",
    createdAt : 'created_at',
    updatedAt : 'updated_at',
    underscored : true,
    deletedAt : 'deleted_at',
} )

export default ModelUsers
