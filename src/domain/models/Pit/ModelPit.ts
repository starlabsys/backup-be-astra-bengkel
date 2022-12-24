// To parse this data:
//
//   import { Convert, GetListPit } from "./file";
//
//   const getListPit = Convert.toGetListPit(json);

export interface ModelPit {
    listOfPIT: ListOfPIT[];
    message:   string;
    ack:       number;
}

export interface ListOfPIT {
    id:        number;
    rowStatus: number;
    kodePit:   string;
    tipePit:   string;
    status:    string;
}

// Converts JSON strings to/from your types
export class ConvertGetPit {
    public static toGetListPit(json: string): ModelPit {
        return JSON.parse(json);
    }

    public static getListPitToJson(value: ModelPit): string {
        return JSON.stringify(value);
    }
}
