import * as express from "express";
import * as cors from "cors";
import * as bodyparser from "body-parser";
import {requestLoggerMiddleware} from "./request.logger.middelware";
import { ManagerCarOwnerRouter } from "./applications/CarOwner/ManagerCarOwner.router";


const app = express();
app.use(cors());
app.use(bodyparser.json());
// app.use(requestLoggerMiddleware);
app.use("/car",ManagerCarOwnerRouter) 

export {app};