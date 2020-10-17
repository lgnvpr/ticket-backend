import { get } from "mongoose";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { Customer } from "../../../base-ticket/base-carOwner/Customer";
import { Route } from "../../../base-ticket/base-carOwner/Route";
import { Staff } from "../../../base-ticket/base-carOwner/Staff";
import { Ticket } from "../../../base-ticket/base-carOwner/Ticket";
import { Trip } from "../../../base-ticket/base-carOwner/Trip";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";
import { CarService } from "./CarService";
import { ChairService } from "./ChairService"

const collection = "Trip"
export class TripCarService {
    public static async list(params: any): Promise<any> {
        var getData: Paging<Trip> = await MongoService._list(collection, params);
        let carIds = getData.rows.map((trip: Trip) => {
            return MongoService.convertIdToIdObject(trip.CarId);
        });

        let createQuery = {
            page: null,
            query: MongoService.createQueryForListId(carIds)
        }
        let driveIds = getData.rows.map((trip: Trip) => {
            return trip.driveId
        });

        let routeIds = getData.rows.map((trip: Trip) => {
            return trip.RouteId
        })

        let car = await ResReturn.getDataRes(await CarService.list(createQuery));
        // return ResReturn.returnData(car);
        // return ResReturn.getDataRes(ResReturn.returnData(car));
        let drive = await MongoService._get("Staff", [...driveIds])
        let route = await MongoService._get("Route", [...routeIds])
        getData.rows.map((trip: Trip) => {
            trip.drive = drive.find((staff: Staff) => trip.driveId == staff._id);
            trip.Route = route.find((route: Route) => trip.RouteId == route._id);
            trip.Car = car.rows.find((car: Car) => trip.CarId == car._id);
            return trip;
        })
        // console.log(get))
        return ResReturn.returnData(getData);
    }

    public static async listByCarId(params: any): Promise<any> {
        var getData: Paging<Trip> = await MongoService._getByQuery(collection, { CarId: params.carId });
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

    public static async getChairByTrip(params: any): Promise<any> {
        let getTrip = await MongoService._get(collection, { _id: params._id });
        getTrip = getTrip[0] || []
        let getCarOfTrip = await MongoService._get("Car", { _id: getTrip.CarId })
        getCarOfTrip = getCarOfTrip[0] || {}
        let getListChair = await ChairService.getByCarId({ carId: getCarOfTrip._id });

        let getTickByCarAndTrip: Paging<Ticket> = await MongoService._list("Ticket", {
            query: {
                CarId: getTrip.CarId,
                tripId: getTrip._id.toString()
            }
        });
        let ticks = getTickByCarAndTrip.rows;
        let customerIds = ticks.map((tick : Ticket)=>{
            return tick.customerId;
        })

        let getListCustomer = await MongoService._get("Customer",customerIds)
        console.log("---------------------------")
        console.log(customerIds);
        let newDiagramChair = ResReturn.getDataRes(getListChair).map((floor: any) => {
            return floor.map((row: any) => {
                return row.map((column: any) => {
                    let saveColumn = column;
                    if (saveColumn._id) {
                        let getTickOfChair: Ticket = ticks.find((tick: Ticket) => tick.ChairCarId == saveColumn._id);
                        if (getTickOfChair) {
                            getTickOfChair.customer = getListCustomer.find((customer  : Customer)=> customer._id == getTickOfChair.customerId)
                            getTickOfChair.ChairCar = saveColumn;
                            return getTickOfChair;
                        } else {
                            return { tripId: getTrip._id, CarId: getTrip.CarId, ChairCarId: saveColumn._id,ChairCar :saveColumn  }
                        }
                    } else {
                        return {}
                    }
                })
            })
        })
        return ResReturn.returnData(newDiagramChair);
    }













}