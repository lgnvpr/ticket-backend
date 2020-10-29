import { get } from "mongoose";
import { Meta } from "../../../app";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { PostionStaff } from "../../../base-ticket/base-carOwner/PostionStaff";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "PostionStaff";
export class PostionStaffService {
    public static async list(ctx: Meta<any>): Promise<any> {
        var getData: any = await MongoService._list(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async create(ctx: Meta<PostionStaff>): Promise<any>{
        if ( !ctx.params ||!ctx.params.name) {
            return  ResReturn.returnError("Không được để trống tên chức vụ")
        }
        var getData: any = await MongoService._create(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async delete(ctx: Meta<any>) : Promise<any> {
        let params: any = ctx.params;
        let getData: any;
        if(params && params._id)
        getData  = await MongoService.setInActive(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async getById(ctx: Meta<any>) : Promise<any> {
        let params: any = ctx.params;
        var getData: any = await MongoService._get(collection, {...ctx, params : {_id : ctx.params.id}});
        return ResReturn.returnData(getData);
    }













}