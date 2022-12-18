export interface ModelLogin {
    access_token : string;
    token_type : string;
    expires_in : number;
    refresh_token : string;
    FullName : string;
    Role : string;
    salesPersonCode : string;
    branchCode : string;
    branchName : string;
}

// Converts JSON strings to/from your types
export class ConvertModelLogin {
    public static toModelLogin( json : string ) : ModelLogin {
        return JSON.parse( json );
    }

    public static modelLoginToJson( value : ModelLogin ) : string {
        return JSON.stringify( value );
    }
}
