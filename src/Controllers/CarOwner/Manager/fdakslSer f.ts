import { get } from "mongoose";
import { Meta } from "../../../app";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { Customer } from "../../../base-ticket/base-carOwner/Customer";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "fdsjak"
export class CustomerService {
    public static async list(ctx: Meta<any>): Promise<any> {
        var getData: any = await MongoService._list(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async create(ctx: Meta<Customer>): Promise<any>{
        if (!ctx.params || !ctx.params?.name || !ctx.params.phoneNumber) {
            return ResReturn.returnError("Không được để trống tên và số điện thoại");
        }
        var getData: any = await MongoService._create(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async delete(ctx: Meta<any> ) : Promise<any> {
        let params: any = ctx.params;
        let getData: any;
        if(params && params._id)
        getData  = await MongoService.setInActive(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async getById(ctx: Meta<any>) : Promise<any> {
        let params: any = ctx.params.id;
        var getData: any = await MongoService._get(collection, {...ctx, params : {_id : ctx.params.id}});
        return ResReturn.returnData(getData);
    }













}