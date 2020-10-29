import { get } from "mongoose";
import ResReturn from "../../../applications/ResReturn";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { Paging } from "../../../base-ticket/Paging";
import { CharDay, Statistical } from "../../../base-ticket/Statistical/Statistical";
import { MongoService } from "../../MongoService";

export class StatisticalService {
    public static async Statistical(params: any): Promise<any> {
        if (typeof params?.query == "string") {
            params.query = JSON.parse(params.query);
        }
        var totalCustomer: any = await MongoService._Query("Customer", [
            { $match: {} },
            { $group: { _id: "count", totalCustomer: { $sum: 1 } } }
        ]);

        var totalRevenue: any = await MongoService._Query("Ticket", [
            { $match: {} },
            {
                $lookup: {
                    from: "Trip",
                    localField: "tripId",
                    foreignField: "_id",
                    as: "Trip"
                }
            },
            { $unwind: "$Trip" },
            { $group: { _id: "trip", totalRevenue: { $sum: "$Trip.price" } } }
        ]);

        var totalTrip: any = await MongoService._Query("Trip", [
            { $match: {} },
            { $group: { _id: "trip", totalTrip: { $sum: 1 } } }
        ])

        var totalTicket: any = await MongoService._Query("Ticket", [
            { $match: {} },
            { $group: { _id: "ticket", totalTicket: { $sum: 1 } } }
        ])

        let typeGet : any = {
            year: { $year: "$createAt" },
            month: { $month: "$createAt" },
            day: { $dayOfMonth: "$createAt" }
        }


        if (params?.query?.typeGet == "month") {
            typeGet = {
                year: { $year: "$createAt" },
                month: { $month: "$createAt" }
            }
        }


        var charTicket: any = await MongoService._Query("Ticket", [
            { $match: {} },
            {
                $group: {
                    '_id': typeGet,
                    data: { $sum: 1 }
                }
            },
        ])

        var charRevenue: any = await MongoService._Query("Ticket", [
            { $match: {} },
            {
                $lookup: {
                    from: "Trip",
                    localField: "tripId",
                    foreignField: "_id",
                    as: "Trip"
                }
            },
            { $unwind: "$Trip" },
            {
                $group: {
                    _id: typeGet,
                    data: { $sum: "$Trip.price" }
                }
            }
        ])

        console.log("--------------------------------");
        console.log(params)
        

        var statistic: Statistical = {
            totalCustomer: totalCustomer[0]?.totalCustomer || 0,
            totalRevenue: totalRevenue[0]?.totalRevenue||0,
            totalTicket: totalTicket[0]?.totalTicket || 0,
            totalTrip: totalTrip[0]?.totalTrip || 0,
            charTicket: this.exportDataChar(charTicket, params?.query?.totalGet || 7) || [],
            charRevenue: this.exportDataChar(charRevenue, params?.query?.totalGet || 7) || []

        }

        return ResReturn.returnData(statistic);
    }

    private static exportDataChar(data: any, numberLoop: number = 7): any {
        let newData: CharDay[] = data.map((dataChar => {
            let date: Date = new Date(`${dataChar._id.year}/${dataChar._id.month}/${dataChar._id.day}`);
            date = this.resetDate(date);
            dataChar.day = date;
            delete dataChar._id;
            return dataChar;
        }))
        let returnData: CharDay[] = [];
        for (let i = 0; i < numberLoop; i++) {
            let dateNeedRender: Date = this.resetDate(new Date);
            dateNeedRender.setDate(dateNeedRender.getDate() - i);
            let getData = newData.find(dataItem => dataItem.day.getTime() === dateNeedRender.getTime());
            returnData.push(getData || { data: 0, day: dateNeedRender });
        }
        return returnData.reverse();
        //tìm theo ngày 
    }
    private static resetDate(date: Date): Date {
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        date.setMilliseconds(0);
        return new Date(date)
    }



    /*
        - Tổng lượng khách hàng
        - Tổng doanh thu
                select vé xe
                join bản chuyến đi vào
                sum theo tiền của chuyến đi 
        - Tổng số lượng vé bán ra
        - Tổng số số chuyến đã đi
        
        ----------------------------------------------------------------
        Thống kê theo biểu đồ
    
        -- Tổng số lượng vé
        -- Tổng số lượng khách hàng
        -- Tổng doanh thu
    
    
    */











}