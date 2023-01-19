import { Response } from "express";
import { ModelListExcel } from "../../model/ModelListExcel";
import { ModelResultImportPkb } from "../../model/ModelResultImportPkb";
import { ResponseImportPkb } from "../../utils/ResponseImportPkb/ResponseImportPkb";
import { EnumErrorImportPKB } from "../../utils/enum/EnumErrorImportPKB";
import CustomerRepository from "../../../../domain/repository/CustomerRepository/CustomerRepository";
import { ModelParamPkb } from "../../model/ModelParamPkb";
import GetAreaPkb from "./GetAreaPkb";
import { ModelGetAreaPkb } from "../../model/ModelGetAreaPkb";


class CustomerPkb {

    public createCustomer = async ( props : ModelParamPkb ) => {
        try {
            const getArea = await GetAreaPkb.getArea( props );

            if ( getArea.message === EnumErrorImportPKB.success ) {
                const area : ModelGetAreaPkb = getArea.data as ModelGetAreaPkb

                const createCustomer = await CustomerRepository.add( props.res, props.token, {
                    action : 0,
                    id : 0,
                    isUpdateQR : false,
                    kodeCustomer : "",
                    title : 'Mr.',
                    namaCustomer : props.data.customer,
                    noktp : props.data.no_ktp.toString(),
                    noPassport : "",
                    alamat : props.data.alamat,
                    gender : props.data.title == "Tuan" ? "L" : "P",
                    provinsi : props.data.provinsi,
                    kabupaten : area.kabupaten,
                    tanggalUlangTahun : "",
                    kecamatan : area.kecamatan,
                    kelurahan : area.kelurahan,
                    zipCode : area.zipCode,
                    noTelepon : "",
                    noHp : props.data.no_hp_1,
                    noFaks : "",
                    email : "",
                    facebook : "",
                    twitter : "",
                    instagram : "",
                    namaKontakPerson : "",
                    noteleponKontakPerson : "",
                    noHpKontakPerson : "",
                    emailKontakPerson : "",
                    jabatanKontakPerson : "",
                    salesmanID : "",
                    website : "",
                    catatan : "",
                    top : 0,
                    kodeGrupDiskonPelanggan : "",
                    agama : "",
                    npwp : "",
                    nppkp : "",
                    alamatPajak : "",
                    alamatKirim : "",
                    up : "",
                    noTeleponAlamatKirim : "",
                    limitKredit : "",
                    aktif : true,
                    jabatanCustomerID : 0
                } )

            }

            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : "Area Tidak Ditemukan"
            } )

        } catch ( e : any ) {
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : e
            } )
        }
    }


    public checkCustomer = async ( props : ModelParamPkb ) : Promise<ModelResultImportPkb> => {
        if ( props.token === '' ) {
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : "Credential Login Invalid"
            } )
        }
        try {
            const checkDatCustomer = await CustomerRepository.get( props.res, props.token, {
                action : 0,
                kodePelanggan : "",
                alamatPelanggan : "",
                namaPelanggan : props.data.customer,
                kotaPelanggan : "",
                kecamatanPelanggan : "",
                kelurahanPelanggan : "",
                pageNumber : 1,
                pageSize : 10,
                totalRow : 100,
                sortColumn : "ID",
                sortDirection : 0
            } )

            if ( checkDatCustomer !== null ) {
                if ( checkDatCustomer?.listPelanggan?.length > 0 ) {
                    const detailCustomer = await CustomerRepository.detail( props.res, props.token, {
                        action : 0,
                        id : checkDatCustomer.listPelanggan[ 0 ].id
                    } )

                    if ( detailCustomer !== null ) {
                        
                        return ResponseImportPkb( {
                            status : EnumErrorImportPKB.success,
                            data : detailCustomer
                        } )
                        
                    }
                }
                else {
                    //create customer
                    // await this.createCustomer( props )
                    
                }
            }
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : "Data Customer Tidak Ditemukan"
            } )
        } catch ( e : any ) {
            return ResponseImportPkb( {
                status : EnumErrorImportPKB.error,
                error : e
            } )
        }
    }

}

export default new CustomerPkb()
