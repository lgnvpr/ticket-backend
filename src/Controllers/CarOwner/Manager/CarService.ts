import { MongoService } from "../../MongoService";

const collection = "Car"
export class CarService {
    public static async get(params: any): Promise<any> {
        var getData: any = await MongoService.get(collection, params);
        return getData;
    }

    public static async create(params : any ): Promise<any>{
        var getData = await MongoService.create(collection, params);
        return getData;
    }

    public static async delete(params : any ) : Promise<any> {
        if(params && params._id)
        return await MongoService.delete(collection, params._id);
        return "err syntax";
    }













}