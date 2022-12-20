export interface InterfaceSyncMaster {
    lastSyncList : InterfaceLastSyncList[]
}

interface InterfaceLastSyncList {
    lastSyncTime : string;
    objectName : string;
}

