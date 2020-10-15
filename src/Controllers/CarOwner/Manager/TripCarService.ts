import { get } from "mongoose";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { Route } from "../../../base-ticket/base-carOwner/Route";
import { Staff } from "../../../base-ticket/base-carOwner/Staff";
import { Trip } from "../../../base-ticket/base-carOwner/Trip";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "Trip"
export class TripCarService {
    public static async list(params: any): Promise<any> {
        
        var getData: Paging<Trip> = await MongoService._list(collection, params, params.page);
        let carIds = getData.rows.map((trip: Trip) => {
            return trip._id
        });


        let driveIds = getData.rows.map((trip: Trip) => {
            return trip.driveId
        });
        let routeIds = getData.rows.map((trip: Trip) => {
            return trip.RouteId
        })

        let drive = await MongoService._get("Staff", [...driveIds])
        let route = await MongoService._get("Route", [...routeIds])

        getData.rows.map((trip: Trip) => {
            trip.drive = drive.find((staff: Staff) => trip.driveId == staff._id);
            trip.Route = route.find((route: Route) => trip.RouteId == route._id);
            return trip;
        })

        return ResReturn.returnData(getData);
    }

    public static async listByCarId(params: any): Promise<any> {
        var getData: Paging<Trip> = await MongoService._getByQuery(collection, {CarId : params.carId});
        let carIds = getData.rows.map((trip: Trip) => {
            return trip._id
        });
        let driveIds = getData.rows.map((trip: Trip) => {
            return trip.driveId
        });
        let routeIds = getData.rows.map((trip: Trip) => {
            return trip.RouteId
        })

        let drive = await MongoService._get("Staff", [...driveIds])
        let route = await MongoService._get("Route", [...routeIds])

        getData.rows.map((trip: Trip) => {
            trip.drive = drive.find((staff: Staff) => trip.driveId == staff._id);
            trip.Route = route.find((route: Route) => trip.RouteId == route._id);
            return trip;
        })

        return ResReturn.returnData(getData);
    }

    public static async create(params: any): Promise<any> {

        var getData: any = await MongoService._create(collection, params);
        return ResReturn.returnData(getData);
    }

    public static async delete(params: any): Promise<any> {
        let getData: any;
        if (params && params._id)
            getData = await MongoService.setInActive(collection, params._id);
        return ResReturn.returnData(getData);
    }

    public static async getById(params: any): Promise<any> {
        var getData: any = await MongoService._get(collection, params);
        return ResReturn.returnData(getData);
    }













}