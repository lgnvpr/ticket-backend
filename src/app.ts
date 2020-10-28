import * as express from "express";
import * as cors from "cors";
import * as bodyparser from "body-parser";
import { requestLoggerMiddleware } from "./request.logger.middelware";
import { ManagerOwnerRouter } from "./applications/CarOwner/ManagerOwner.router";
import { LoginCarOwnerRouter } from "./applications/CarOwner/LoginCarOwner.router";
import { Staff } from "./base-ticket/base-carOwner/Staff";
import { MongoService } from "./Controllers/MongoService";
var jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyparser.json());


// app.use(requestLoggerMiddleware);
app.use("/manager",async function (req: Context, res, next) {
    req.meta = {} as any;
    let check = [];
    let verifyInfo: Staff = {} as Staff;
    try {
        var decoded = jwt.verify(req.headers["authorization"], 'luongQuyet');
        verifyInfo = decoded["0"];
        check = await MongoService._get("Staff", {params : verifyInfo,user : {}}as Meta<Staff>);
    } catch (error) {
        res.status(401)
        res.json("error token authentication");
    }
    if (check.length > 0) {
        
        if (!(Object.keys(req.params).length === 0)) {
            req.meta.params = req.params
        }

        if (!(Object.keys(req.body).length === 0)) {
            req.meta.params = req.body as any;
        }

        if (!(Object.keys(req.query).length === 0)) {
            req.meta.params = req.query as any;
        }

        req.meta.user = verifyInfo;
        LoginCarOwnerRouter
        next();
        
    }
    else {
        res.status(401)
        res.json("error token authentication");
    }

}, ManagerOwnerRouter)

app.use("/user", LoginCarOwnerRouter)

export { app };

export interface Context extends express.Request {
    meta: Meta<any>;
}

export interface Meta<T>  {
    params: T;
    user: any;
}