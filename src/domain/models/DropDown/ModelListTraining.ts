// To parse this data:
//
//   import { Convert, ModelListTraining } from "./file";
//
//   const modelListTraining = Convert.toModelListTraining(json);

export interface ModelListTraining {
    listLevelTraining : ListLevelTraining[];
    message : string;
    ack : number;
}

export interface ListLevelTraining {
    idLevelTraining : number;
    trainingLevel : string;
    idJabatan : number;
}

// Converts JSON strings to/from your types
export class ConvertModelListTraining {
    public static toModelListTraining( json : string ) : ModelListTraining {
        return JSON.parse( json );
    }

    public static modelListTrainingToJson( value : ModelListTraining ) : string {
        return JSON.stringify( value );
    }
}
