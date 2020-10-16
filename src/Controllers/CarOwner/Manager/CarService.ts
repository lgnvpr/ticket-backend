import { get } from "mongoose";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { TypeCar } from "../../../base-ticket/base-carOwner/TypeCar";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "Car"
export class CarService {
    public static async list(params: any): Promise<any> {
        var getData: Paging<Car> = await MongoService._list(collection, params);
        let typeCarIds = getData.rows.map((car : Car)=>{
            return car.typeCarId
        })
        let getTypeCars : TypeCar[] = await MongoService._get("TypeCar", typeCarIds)
        getData.rows.map((car  : Car)=>{
            car.TypeCar = getTypeCars.find((typeCar : TypeCar)=> typeCar._id == car.typeCarId)
            return car;
        })
        return ResReturn.returnData(getData);
    }
    
    public static async create(params : any ): Promise<any>{
        let car : Car = params;   
        var getData: any = await MongoService._create(collection, car);
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