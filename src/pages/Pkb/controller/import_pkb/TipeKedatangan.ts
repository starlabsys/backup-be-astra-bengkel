class TipeKedatangan {
    public switchTipe = async (props: any): Promise<any> => {
        const tipeK = props.nama

        switch (tipeK) {
            case "Walk-in AHASS / Non Promotion":
                return 1;
                break;
            case "Pit Express":
                return 4;
                break;
            case "Pos Service":
                return 5;
                break;
            case "Service Kunjung Motor/Emergency":
                return 6;
                break;
            case "Service Kunjung Mobil":
                return 7;
                break;
            case "Service Kunjung Tenda":
                return 8;
                break;
            case "Join Dealer Activity":
                return 9;
                break;
            case "Group Customer":
                return 10;
                break;
            case "Pit Express Tenda":
                return 11;
                break;
            case "Service Reminder":
                return 12;
                break;
            case "Public Area":
                return 16;
                break;
            case "AHASS Event (AHM)":
                return 17;
                break;
            case "AHASS Event (MD)":
                return 18;
                break;
            case "AHASS Event (D)":
                return 19;
                break;
            case "AHASS Keliling":
                return 20;
                break;
            case "Service Visit Home Service":
                return 21;
                break;
            case "Pit Express Outdoor":
                return 22;
                break;
            case "Pit Express Indoor":
                return 23;
                break;
        }
    }
}

export default new TipeKedatangan()