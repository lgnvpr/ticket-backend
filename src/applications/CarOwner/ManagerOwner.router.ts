import { json } from 'body-parser';
import * as express from 'express';

import { CarService } from '../../Controllers/CarOwner/Manager/CarService';
import { ChairService } from '../../Controllers/CarOwner/Manager/ChairService';
import { CustomerService } from '../../Controllers/CarOwner/Manager/CustomerService';
import { PostionStaffService } from '../../Controllers/CarOwner/Manager/PostionStaffService';
import { StaffService } from '../../Controllers/CarOwner/Manager/StaffService';
import { TicketService } from '../../Controllers/CarOwner/Manager/TicketService';
import { RouteCarService } from '../../Controllers/CarOwner/Manager/RouteCarService';
import { TypeCarService } from '../../Controllers/CarOwner/Manager/TypeCarService';
import { TripCarService } from '../../Controllers/CarOwner/Manager/TripCarService';
import { AccountService } from '../../Controllers/CarOwner/Manager/AccountService';
import { StatisticalService } from '../../Controllers/CarOwner/Manager/StatisticalService';
import { Context, Meta } from '../../app';

const ManagerOwnerRouter = express.Router();

//quản lí xe
ManagerOwnerRouter.get("/car", async (req: Context, res: express.Response) => {
    let getRes = await CarService.list(req.meta)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/car", async(req: Context, res: express.Response) => {
    let getRes = await CarService.create(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/car", async(req: Context, res: express.Response)=>{
    let getRes = await CarService.delete(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/car/:id", async (req: Context, res: express.Response)=>{
    let getRes = await CarService.getById(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})

//quản lí loại xe


ManagerOwnerRouter.get("/typeCar", async (req: Context, res: express.Response) => {
    let getRes = await TypeCarService.list(req.meta)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/typeCar", async(req: Context, res: express.Response) => {
    let getRes = await TypeCarService.create(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/typeCar", async(req: Context, res: express.Response)=>{
    let getRes = await TypeCarService.delete(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/typeCar/:id", async (req: Context, res: express.Response)=>{
    let getRes = await TypeCarService.getById(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})

//quản lí ghế
ManagerOwnerRouter.get("/ChairCar", async (req: Context, res: express.Response) => {
    let getRes = await ChairService.list(req.meta)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/ChairCar", async(req: Context, res: express.Response) => {
    let getRes = await ChairService.create(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/ChairCar/autoCreate", async(req: Context, res: express.Response) => {
    let getRes = await ChairService.autoCreate(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/ChairCar", async(req: Context, res: express.Response)=>{
    let getRes = await ChairService.delete(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/ChairCar/:id", async (req: Context, res: express.Response)=>{
    let getRes = await ChairService.getById(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})


ManagerOwnerRouter.get("/ChairCar/getByCarId/:id", async (req: Context, res: express.Response) => {

    let getRes = await ChairService.getByCarId(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})


//quản lí nhân viên



ManagerOwnerRouter.get("/staff", async (req: Context, res: express.Response) => {
    console.log("on router")
    let getRes = await StaffService.list(req.meta)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/staff", async(req: Context, res: express.Response) => {
    let getRes = await StaffService.create(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/staff", async(req: Context, res: express.Response)=>{
    let getRes = await StaffService.delete(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/staff/:id", async (req: Context, res: express.Response)=>{
    let getRes = await StaffService.getById(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})

//quản lí chức vụ


ManagerOwnerRouter.get("/positionStaff", async (req: Context, res: express.Response) => {
    let getRes = await PostionStaffService.list(req.meta)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/positionStaff", async(req: Context, res: express.Response) => {
    let getRes = await PostionStaffService.create(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/positionStaff", async(req: Context, res: express.Response)=>{
    let getRes = await PostionStaffService.delete(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/positionStaff/:id", async (req: Context, res: express.Response)=>{
    let getRes = await PostionStaffService.getById(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})

// khách hàng

ManagerOwnerRouter.get("/customer", async (req: Context, res: express.Response) => {
    let getRes = await CustomerService.list(req.meta)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/customer", async(req: Context, res: express.Response) => {
    let getRes = await CustomerService.create(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/customer", async(req: Context, res: express.Response)=>{
    let getRes = await CustomerService.delete(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/customer/:id", async (req: Context, res: express.Response)=>{
    let getRes = await CustomerService.getById(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})


//lộ trình
ManagerOwnerRouter.get("/route", async (req: Context, res: express.Response) => {
    let getRes = await RouteCarService.list(req.meta)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/route", async(req: Context, res: express.Response) => {
    let getRes = await RouteCarService.create(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/route", async(req: Context, res: express.Response)=>{
    let getRes = await RouteCarService.delete(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/route/:id", async (req: Context, res: express.Response)=>{
    let getRes = await RouteCarService.getById(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})

//Vé xe
ManagerOwnerRouter.get("/ticket", async (req: Context, res: express.Response) => {
    let getRes = await TicketService.list(req.meta)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/ticket", async(req: Context, res: express.Response) => {
    let getRes = await TicketService.create(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/ticket", async(req: Context, res: express.Response)=>{
    let getRes = await TicketService.delete(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/ticket/:id", async (req: Context, res: express.Response)=>{
    let getRes = await TicketService.getById(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})
// lấy dữ liệu ghé theo lộ trình
ManagerOwnerRouter.get("/trip/getChair/:id", async (req: Context, res: express.Response)=>{
    let getRes = await TripCarService.getChairByTrip(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})
//quản lí lộ trình 

ManagerOwnerRouter.get("/trip", async (req: Context, res: express.Response) => {
    let getRes = await TripCarService.list(req.meta)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/trip", async(req: Context, res: express.Response) => {
    let getRes = await TripCarService.create(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/trip", async(req: Context, res: express.Response)=>{
    let getRes = await TripCarService.delete(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.get("/trip/:id", async (req: Context, res: express.Response) => {
    
    let getRes = await TripCarService.getById(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})


ManagerOwnerRouter.get("/trip/car/:id", async (req: Context, res: express.Response) => {
    req.meta = req.params as any;
    console.log("===on data of router id====")
    console.log(req)
    let getRes = await ChairService.getByCarId(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})



// acccount
ManagerOwnerRouter.get("/account", async (req: Context, res: express.Response) => {
    let getRes = await AccountService.list(req.meta)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/account", async(req: Context, res: express.Response) => {
    let getRes = await AccountService.create(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/account", async(req: Context, res: express.Response)=>{
    let getRes = await AccountService.delete(req.meta)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/account/:id", async (req: Context, res: express.Response)=>{
    let getRes = await AccountService.getById(getIdOfParams(req))
    res.status(getRes.status);
    res.json(getRes.json);
})

//statistic
ManagerOwnerRouter.get("/statistic", async (req: Context, res: express.Response)=>{
    let getRes = await StatisticalService.Statistical(req.meta);
    res.status(getRes.status);
    res.json(getRes.json);
})

export { ManagerOwnerRouter }

function getIdOfParams(ctx: Context): Meta<any>{
    return {
        params: {id : ctx.params.id},
        user : ctx.meta.user
    }
}