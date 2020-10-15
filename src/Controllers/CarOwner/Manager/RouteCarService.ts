import { get } from "mongoose";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { Staff } from "../../../base-ticket/base-carOwner/Staff";
import { Trip } from "../../../base-ticket/base-carOwner/Trip";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "Route"
export class RouteCarService {
    public static async list(params: any): Promise<any> {
        var getData: Paging<Trip> = await MongoService._list(collection, params,params.page);
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