import * as express from "express";
import * as cors from "cors";
import * as bodyparser from "body-parser";
import {requestLoggerMiddleware} from "./request.logger.middelware";
import { ManagerOwnerRouter } from "./applications/CarOwner/ManagerOwner.router";
import {LoginCarOwnerRouter} from "./applications/CarOwner/LoginCarOwner.router";

const app = express();
app.use(cors());
app.use(bodyparser.json());

// app.use(requestLoggerMiddleware);
app.use("/manager",ManagerOwnerRouter) 
app.use("/user",LoginCarOwnerRouter) 

export {app};