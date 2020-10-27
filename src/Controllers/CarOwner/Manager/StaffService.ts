import { get } from "mongoose";
import ResReturn from "../../../applications/ResReturn";
import { Account } from "../../../base-ticket/base-carOwner/Account";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { PostionStaff } from "../../../base-ticket/base-carOwner/PostionStaff";
import { Staff } from "../../../base-ticket/base-carOwner/Staff";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "Staff"
export class StaffService {
    public static async list(params: any): Promise<any> {
        var getData: Paging<Staff> = await MongoService._list(collection, params);
        var postionStaffIds : Array<string> =  getData.rows.map((staff : Staff)=> staff.positionId); 
        var staffIds : Array<string> = getData.rows.map((staff : Staff)=> staff._id)
        var getPostionStaff: any = await MongoService._get("PostionStaff", postionStaffIds);
        var getAccount: Paging<Account> = await MongoService._list("account", params.query = {
            staffId: { $in: staffIds } }
        )

        console.log(getAccount)

        getData.rows.map((staff : Staff)=> {
            staff.position = getPostionStaff.find((position: PostionStaff) => position._id == staff.positionId)
            staff.account = getAccount.rows.find((account: Account) => account.staffId == staff._id)
            return staff;
        })

        return ResReturn.returnData(getData);
    }

    public static async create(params : any ): Promise<any>{
        var getData: any = await MongoService._create(collection, params);
        return ResReturn.returnData(getData);
    }

    public static async delete(params : any ) : Promise<any> {
        let getData: any;   
        if(params && params._id)
        getData  = await MongoService.setInActive(collection, params._id);
        return ResReturn.returnData(getData);
    }

    public static async getById(params:any) : Promise<any> {
        var getData: any = await MongoService._get(collection, params);
        return ResReturn.returnData(getData);
    }













}