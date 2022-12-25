// To parse this data:
//
//   import { Convert, GetListPit } from "./file";
//
//   const getListPit = Convert.toGetListPit(json);

export interface ModelPitMekanik {
    listOfPITMekanik: ListOfPITMekanik[];
    message:          string;
    ack:              number;
}

export interface ListOfPITMekanik {
    listMekanik: ListMekanik[];
    pitID:       number;
    kodePit:     string;
}

export interface ListMekanik {
    aktif:       boolean;
    labelAktif:  string;
    mekanikID:   number;
    mekanik:     string;
    kodeMekanik: string;
    isDisable:   boolean;
}

// Converts JSON strings to/from your types
export class ConvertGetPitMekanik {
    public static toGetListPitMekanik(json: string): ModelPitMekanik {
        return JSON.parse(json);
    }

    public static getListPitToJson(value: ModelPitMekanik): string {
        return JSON.stringify(value);
    }
}
