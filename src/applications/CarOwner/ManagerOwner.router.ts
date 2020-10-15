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

const ManagerOwnerRouter = express.Router();

//quản lí xe
ManagerOwnerRouter.get("/car", async (req: express.Request, res: express.Response) => {
    let getRes = await CarService.list(req.body)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/car", async(req: express.Request, res: express.Response) => {
    let getRes = await CarService.create(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/car", async(req: express.Request, res: express.Response)=>{
    let getRes = await CarService.delete(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/car/:id", async (req: express.Request, res: express.Response)=>{
    let getRes = await CarService.getById({_id : req.params.id})
    res.status(getRes.status);
    res.json(getRes.json);
})

//quản lí loại xe


ManagerOwnerRouter.get("/typeCar", async (req: express.Request, res: express.Response) => {
    let getRes = await TypeCarService.list(req.body)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/typeCar", async(req: express.Request, res: express.Response) => {
    let getRes = await TypeCarService.create(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/typeCar", async(req: express.Request, res: express.Response)=>{
    let getRes = await TypeCarService.delete(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/typeCar/:id", async (req: express.Request, res: express.Response)=>{
    let getRes = await TypeCarService.getById({_id : req.params.id})
    res.status(getRes.status);
    res.json(getRes.json);
})

//quản lí ghế
ManagerOwnerRouter.get("/ChairCar", async (req: express.Request, res: express.Response) => {
    let getRes = await ChairService.list(req.body)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/ChairCar", async(req: express.Request, res: express.Response) => {
    let getRes = await ChairService.create(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/ChairCar/autoCreate", async(req: express.Request, res: express.Response) => {
    let getRes = await ChairService.autoCreate(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/ChairCar", async(req: express.Request, res: express.Response)=>{
    let getRes = await ChairService.delete(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/ChairCar/:id", async (req: express.Request, res: express.Response)=>{
    let getRes = await ChairService.getById({_id : req.params.id})
    res.status(getRes.status);
    res.json(getRes.json);
})


ManagerOwnerRouter.get("/ChairCar/getByCarId/:id", async (req: express.Request, res: express.Response)=>{
    let getRes = await ChairService.getByCarId({carId : req.params.id})
    res.status(getRes.status);
    res.json(getRes.json);
})


//quản lí nhân viên

ManagerOwnerRouter.get("/staff/page=:page", async (req: express.Request, res: express.Response) => {

    let getRes = await StaffService.list(req.body, req.params.page)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.get("/staff", async (req: express.Request, res: express.Response) => {

    let getRes = await StaffService.list(req.body, req.query.page)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/staff", async(req: express.Request, res: express.Response) => {
    let getRes = await StaffService.create(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/staff", async(req: express.Request, res: express.Response)=>{
    let getRes = await StaffService.delete(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/staff/:id", async (req: express.Request, res: express.Response)=>{
    let getRes = await StaffService.getById({_id : req.params.id})
    res.status(getRes.status);
    res.json(getRes.json);
})

//quản lí chức vụ


ManagerOwnerRouter.get("/positionStaff", async (req: express.Request, res: express.Response) => {
    let getRes = await PostionStaffService.list(req.body)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/positionStaff", async(req: express.Request, res: express.Response) => {
    let getRes = await PostionStaffService.create(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/positionStaff", async(req: express.Request, res: express.Response)=>{
    let getRes = await PostionStaffService.delete(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/positionStaff/:id", async (req: express.Request, res: express.Response)=>{
    let getRes = await PostionStaffService.getById({_id : req.params.id})
    res.status(getRes.status);
    res.json(getRes.json);
})

// khách hàng

ManagerOwnerRouter.get("/customer", async (req: express.Request, res: express.Response) => {
    let getRes = await CustomerService.list(req.body)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/customer", async(req: express.Request, res: express.Response) => {
    let getRes = await CustomerService.create(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/customer", async(req: express.Request, res: express.Response)=>{
    let getRes = await CustomerService.delete(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/customer/:id", async (req: express.Request, res: express.Response)=>{
    let getRes = await CustomerService.getById({_id : req.params.id})
    res.status(getRes.status);
    res.json(getRes.json);
})


//lộ trình
ManagerOwnerRouter.get("/route", async (req: express.Request, res: express.Response) => {
    let getRes = await RouteCarService.list(req.body)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/route", async(req: express.Request, res: express.Response) => {
    let getRes = await RouteCarService.create(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/route", async(req: express.Request, res: express.Response)=>{
    let getRes = await RouteCarService.delete(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/route/:id", async (req: express.Request, res: express.Response)=>{
    let getRes = await RouteCarService.getById({_id : req.params.id})
    res.status(getRes.status);
    res.json(getRes.json);
})

//Vé xe
ManagerOwnerRouter.get("/ticket", async (req: express.Request, res: express.Response) => {
    let getRes = await TicketService.list(req.body)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/ticket", async(req: express.Request, res: express.Response) => {
    let getRes = await TicketService.create(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/ticket", async(req: express.Request, res: express.Response)=>{
    let getRes = await TicketService.delete(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})
ManagerOwnerRouter.get("/ticket/:id", async (req: express.Request, res: express.Response)=>{
    let getRes = await TicketService.getById({_id : req.params.id})
    res.status(getRes.status);
    res.json(getRes.json);
})
//quản lí lộ trình 

ManagerOwnerRouter.get("/trip", async (req: express.Request, res: express.Response) => {
    console.log("===============req.body======================")
    console.log(req.query);
    let getRes = await TripCarService.list(req.query)
    res.status(getRes.status)
    res.json(getRes.json);
})

ManagerOwnerRouter.post("/trip", async(req: express.Request, res: express.Response) => {
    let getRes = await TripCarService.create(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.delete("/trip", async(req: express.Request, res: express.Response)=>{
    let getRes = await TripCarService.delete(req.body)
    res.status(getRes.status);
    res.json(getRes.json);
})

ManagerOwnerRouter.get("/trip/:id", async (req: express.Request, res: express.Response)=>{
    let getRes = await TripCarService.getById({_id : req.params.id})
    res.status(getRes.status);
    res.json(getRes.json);
})


ManagerOwnerRouter.get("/trip/car/:id", async (req: express.Request, res: express.Response)=>{
    let getRes = await ChairService.getByCarId({carId : req.params.id})
    res.status(getRes.status);
    res.json(getRes.json);
})


export { ManagerOwnerRouter }