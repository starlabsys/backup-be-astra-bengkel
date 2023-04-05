import { ModelDetailJasa } from "../../../../domain/models/Jasa/ModelDetailJasa";
import ResponseCode from "../../../../utils/ResponseCode/ResponseCode";

class DetailJasa {
    public getDetailJasa = async (props: any) => {
        return ResponseCode.successGet("props", "props", props);
    }
}

export default new DetailJasa();