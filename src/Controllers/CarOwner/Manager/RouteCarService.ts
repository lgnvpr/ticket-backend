import { Router } from "express";
import { get } from "mongoose";
import { Meta } from "../../../app";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { Route } from "../../../base-ticket/base-carOwner/Route";
import { Staff } from "../../../base-ticket/base-carOwner/Staff";
import { Trip } from "../../../base-ticket/base-carOwner/Trip";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "Route"
export class RouteCarService {
    public static async list(ctx: Meta<any>): Promise<any> {

        var getData: Paging<Route> = await MongoService._list(collection, ctx);
        // let carIds = getData.rows.map((trip : Trip )=>{
        //     return trip._id
        // });
        // let driveIds = getData.rows.map((trip :Trip )=>{
        //     return trip.driverId
        // });
        // let staffId = getData.rows.map((trip : Trip)=>{
        //     return trip.staffId
        // })

        // let staff = await MongoService._get("Staff", [...staffId, ...driveIds])
        // console.log(staff);
        // getData.rows.map((trip : Trip )=>{
        //     trip.driver = staff.find((staff : Staff)=> trip.driverId == staff._id );
        //     trip.staff = trip?.staffId?.map((staffId : string)=>{
        //         return staff.find((staff : Staff)=> staff._id ==staffId )
        //     })
        // })
    
        return ResReturn.returnData(getData);
    }

    public static async create(ctx: Meta<Route>): Promise<any>{
        let route: Route = ctx.params;
        console.log(ctx)
        if (!route || !route.localStart || route.localEnd || !route.startAt || !route.sumTimeRun) {
            return ResReturn.returnError("Vui lòng nhập đầy đủ thông tin")
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
        var getData: any = await MongoService._get(collection, {...ctx, params : {_id : ctx.params.id}});
        return ResReturn.returnData(getData);
    }
}