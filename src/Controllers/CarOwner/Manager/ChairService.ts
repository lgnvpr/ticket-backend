import { get } from "mongoose";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { ChairCar } from "../../../base-ticket/base-carOwner/ChairCar";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "ChairCar";
export class ChairService {
    public static async list(params: any): Promise<any> {
        var getData: any = await MongoService._list(collection, params, params.page);
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

    public static async getByCarId(params: any): Promise<any> {
        var carId: any = params.carId;
        let getData = await MongoService._getByQuery(collection, { CarId: carId });

        let listChair: Array<any> = getData.map((chair: ChairCar, value: number) => {
            let getRow: ChairCar = getData.find((chair3: ChairCar) => chair3.localRow == value)
            if (getRow) {
                let rows: Array<any> = getData.map((chair2: ChairCar) => {
                    if (chair2.localRow == getRow?.localRow) return chair2;
                })
                rows = rows.filter(function(el){return el != null && el != '';});
                let newRows: Array<any> =new Array();
                for (let i = 1; i <= 5; i++) {
                    newRows.push(rows.find((res : ChairCar)=> res.localColumn ==i)|| {localColumn:i,localRow: getRow.localRow, CarId : carId });
                }
                return newRows;
            }
        })
        listChair = listChair.filter(function(el){return el != null && el != '';});
        
        return ResReturn.returnData(listChair);
    }













}