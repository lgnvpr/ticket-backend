import { get } from "mongoose";
import { Meta } from "../../../app";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { Ticket } from "../../../base-ticket/base-carOwner/Ticket";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "Ticket"
export class TicketService {
    public static async list(ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        var getData: any = await MongoService._list(collection, params);
        return ResReturn.returnData(getData);
    }

    public static async create(ctx: Meta<Ticket>): Promise<any> {
        
        let params: any = ctx.params;
        let ticket: Ticket = params;
        if (!ticket.customer.name || !ticket.customer.phoneNumer) {
            return ResReturn.returnError("Không được để trống tên và số điên thoại khách hàng");
        }
        let getCustomer = ticket.customer;
        if (getCustomer) getCustomer = await MongoService._create("Customer", { ...ctx, params: getCustomer });
        ticket.customerId = getCustomer._id.toString();
        delete ticket.customer;
        var getData: any = MongoService._create(collection, { ...ctx, params: ticket });
        return ResReturn.returnData(getData);
    }

    public static async delete(ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        let getData: any;
        if (params && params._id)
            getData = await MongoService.setInActive(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async getById(ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        var getData: any = await MongoService._get(collection, { ...ctx, params: { _id: ctx.params.id } });
        return ResReturn.returnData(getData);
    }













}