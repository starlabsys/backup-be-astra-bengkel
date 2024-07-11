import { Request } from "express";
import ModelUsers from "../../db/models/ModelUsers";


export const timeOut = 50000

export const baseUrl = () : string => {
    return "https://psshsoapi.astra.co.id/ahasssystemapi"
    // if ( process.env.ENV === 'production' ) {
    //     return process.env.BASE_URL_PROD as string
    // }
    // return process.env.BASE_URL_DEV as string
}

interface InterfaceHeader {
    header? : boolean
    token? : string
}

export const header = async ( props : InterfaceHeader ) => {
    return {
        "Content-Type" : props.header ? "text/plain" : "application/json",
        "Accept" : "application/json, text/plain, */*",
        "Origin" : "https://psshsoapi.astra.co.id",
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        'referer': 'https://psshsoapi.astra.co.id/ahasssystem/',
        "Sec-Fetch-Dest" : "empty",
        "Sec-Fetch-Mode" : "cors",
        "Sec-Fetch-Site" : "same-origin",
        "Priority" : "u=1, i",
        "Accept-Encoding" : "gzip, deflate, br, zstd",
        "Accept-Language" : "en-US,en;q=0.9,id;q=0.8,pl;q=0.7,su;q=0.6,la;q=0.5",
        // "Cookie" : "_hjSessionUser_2007885=eyJpZCI6ImEyZjk1NjliLTcyNWMtNWNhZC1hODZlLWQ1NTA1MDZmZjA0NiIsImNyZWF0ZWQiOjE3MDM3MzAyMTM3MTcsImV4aXN0aW5nIjp0cnVlfQ==; _ga=GA1.4.93360834.1714397075; BIGipServerPool_AHASS_DC=1059072010.20480.0000; _gid=GA1.3.1744211863.1720424826; _gid=GA1.4.1744211863.1720424826; _hjSession_2007885=eyJpZCI6ImUyNWVjMzM4LWE1YjItNGVmMy1hN2E5LTE1MzhjODQ1NTI1ZSIsImMiOjE3MjA0MjQ4MjcxOTUsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; cf_clearance=u0R4d0X1Mp23qsLEZo7qxs4SNbXNmREE6Z6f4hMvJtM-1720424831-1.0.1.1-R6GuVUrVZ9m0pSEeTbAZCn2HZBkJLP8erv17h_uDuPietHxpPhyOmvAPGMMbam1mVkaSNx4XaJOJkYCv6yVKgA; __cf_bm=0MOhStaq3oEz_nZG5hGxBPQorIPxIqkF.O4Kvmspr1k-1720429189-1.0.1.1-W.XWFQyPHoDElUDomlAifnXFmVwAa3f3jhtur6S0yhSNQcp.EhTvcZNBMCCeSwPw0MUmDBTAy.vlfnR5vCjSiw; _gat=1; _ga_CWG1TV2WL0=GS1.1.1720429180.5.1.1720429452.0.0.0; _ga=GA1.3.93360834.1714397075; _gat_gtag_UA_116831818_2=1",
        'Authorization' : `Bearer ${ props.token }`
        // "Content-Type" : props.header ? "text/plain" : "application/json",
        // "Accept" : "application/json, text/plain, */*",
        // "Origin" : "https://psshsoapi.astra.co.id",
        // 'Authorization' : `Bearer ${ props.token }`
    }
}
