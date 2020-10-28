import { get } from "mongoose";
import { Meta } from "../../../app";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { TypeCar } from "../../../base-ticket/base-carOwner/TypeCar";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "Car"
export class CarService {
    public static async list(ctx: Meta<any>): Promise<any> {
        var getData: Paging<Car> = await MongoService._list(collection, ctx);

        let typeCarIds = getData.rows.map((car : Car)=>{
            return car.typeCarId
        })
        let getTypeCars : TypeCar[] = await MongoService._get("TypeCar", {...ctx,params : typeCarIds})
        getData.rows.map((car  : Car)=>{
            car.TypeCar = getTypeCars.find((typeCar : TypeCar)=> typeCar._id == car.typeCarId)
            return car;
        })
        return ResReturn.returnData(getData);
    }
    
    public static async create(ctx: Meta<Car>): Promise<any>{
        let car: Car = ctx.params;
        if (!car || (!car.name || !car.licensePlates || !car.entryAt )) {
            return ResReturn.returnError("Vui lòng nhập đầy đủ thông tin")
        }
        var getData: any = await MongoService._create(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async delete(ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        let getData: any;
        if(params && params._id)
        getData  = await MongoService.setInActive(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async getById(ctx : Meta<any>) : Promise<any> {
        var getData: any = await MongoService._get(collection, {...ctx, params : {_id : ctx.params.id}});
        return ResReturn.returnData(getData);
    }













}