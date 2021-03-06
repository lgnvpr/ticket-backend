import { get } from "mongoose";
import { Meta } from "../../../app";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { ChairCar } from "../../../base-ticket/base-carOwner/ChairCar";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "ChairCar";
export class ChairService {
    public static async list(ctx: Meta<any>): Promise<any> {
        var getData: any = await MongoService._list(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async create(ctx: Meta<ChairCar>): Promise<any> {
        let chairCar: ChairCar = ctx.params;
        if (!chairCar || !chairCar.codeChair) {
            return ResReturn.returnError("Không được để trống tên ghế")
        }
        var getData: any = await MongoService._create(collection, ctx);
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
        var getData: any = await MongoService._get(collection, {...ctx, params : {_id : ctx.params.id}});
        return ResReturn.returnData(getData);
    }

    public static async autoCreate(ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        console.log(`create successfully chair ${params._id}`)
        let carId = params.carId;
        let floor = params.floor;
        let row = params.row;
        let column = params.collumn;
        if (!floor || !row || !column) {
            return ResReturn.returnError("Vui lòng nhập đúng thông tin")
        }

        let listChair: Array<any> = new Array();
        for (let fl = 1; fl <= floor; fl++) {
            for (let rw = 1; rw <= row; rw++) {
                for (let cl = 1; cl <= column; cl++) {
                    let getColumn = 0;
                    if(column ==1) getColumn =3; 
                    if(column ==2) getColumn = (cl-1) *4 +1;
                    if(column ==3) getColumn = Math.floor(cl*1.9);
                    (column ==4 && cl >=3)  ? getColumn = cl+1 : getColumn = cl;
                    if(column ==5 ) getColumn = column;

                    let newChair = {
                        CarId: carId,
                        codeChair: this.codeChair(fl, column, rw),

                        localColumn: getColumn,
                        localRow: rw,
                        localFloor: fl,
                    }
                    listChair.push(newChair);
                }
            }

        }
        var getData: any = await MongoService._create(collection, {...ctx, params : listChair});
        return ResReturn.returnData(getData);

        // return ResReturn.returnData(listChair);

    }
    private static codeChair(fl: number, column: number, rw : number) {
        let getNameFloor = fl == 1 ? "L" : "D"
        let getNameCollum = column == 1 ? "A" : column == 2 ? "B" : column == 3 ? "C" : column == 4 ? "D" : "E"
        return `${getNameFloor} ${rw}${getNameCollum}`
        
    }

    public static async getByCarId(ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        console.log("=======on ctx of get by car id ======")
        console.log(ctx);
        var carId: any = params.id.toString();

        let getData = await MongoService._getByQuery(collection, { CarId: carId });
        // return ResReturn.returnData(getData);
        // let listChair: Array<any> = getData.map((chair: ChairCar, value: number) => {
        //     let getRow: ChairCar = getData.find((chair3: ChairCar) => chair3.localRow == value)
        //     if (getRow) {
        //         let rows: Array<any> = getData.map((chair2: ChairCar) => {
        //             if (chair2.localRow == getRow?.localRow) return chair2;
        //         })
        //         rows = rows.filter(function (el) { return el != null && el != ''; });
        //         let newRows: Array<any> = new Array();
        //         for (let i = 1; i <= 5; i++) {
        //             newRows.push(rows.find((res: ChairCar) => res.localColumn == i) || { localColumn: i, localRow: getRow.localRow, CarId: carId });
        //         }
        //         return newRows;
        //     }
        // })
        // listChair = listChair.filter(function (el) { return el != null && el != ''; });
        let floor: Array<any> = [];
        let row: Array<any> = []

        getData.map((chair: ChairCar) => {
            floor.push(chair.localFloor);
            row.push(chair.localRow);
        })
        floor = floor.filter(function (el) { return el != null && el != ''; });
        row = row.filter(function (el) { return el != null && el != ''; });
        floor = floor.filter((value, index, self) =>{
            return self.indexOf(value) === index;
        });
        row = row.filter((value, index, self) =>{
            return self.indexOf(value) === index;
        });
        
        let testData =  floor.map((floor , getFloor)=>{
            let createRow= row.map((row : any )=>{
                let chair =   getData.filter((chair : ChairCar)=> chair.localFloor == floor && chair.localRow == row )
                let newRows: Array<any> = new Array();
                for (let i = 1; i <= 5; i++) {
                    newRows.push(chair.find((res: ChairCar) => res.localColumn == i) || {localFloor : getFloor +1, localColumn: i, localRow: row, CarId: carId });
                }
                return newRows;
            })
            return createRow;
            
            
        })

        console.log(testData);




        return ResReturn.returnData(testData);
    }













}