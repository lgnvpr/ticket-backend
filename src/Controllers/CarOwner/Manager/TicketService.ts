import { get } from "mongoose";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { Ticket } from "../../../base-ticket/base-carOwner/Ticket";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "Ticket"
export class TicketService {
    public static async list(params: any): Promise<any> {
        var getData: any = await MongoService._list(collection, params);
        return ResReturn.returnData(getData);
    }

    public static async create(params : any ): Promise<any>{


        let ticket : Ticket = params;
            let getCustomer = ticket.customer;
            console.log("customer=======================================");
            if(getCustomer) getCustomer =  await MongoService._create("Customer", getCustomer);
            console.log(getCustomer);
            ticket.customerId = getCustomer._id.toString();
            delete ticket.customer;
            var getData: any = MongoService._create(collection, ticket);
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