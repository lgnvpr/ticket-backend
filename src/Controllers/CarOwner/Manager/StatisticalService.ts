import { get } from "mongoose";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

export class StatisticalService {
    public static async Statistical(params: any): Promise<any> {
        let query = {};
        var getData: any = await MongoService._list("Customer", params);
        return ResReturn.returnData(getData);
    }














}