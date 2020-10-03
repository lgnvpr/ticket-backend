import { get } from "mongoose";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "Ticket"
export class TicketService {
    public static async list(params: any): Promise<any> {
        var getData: any = await MongoService._list(collection, params,params.page);
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