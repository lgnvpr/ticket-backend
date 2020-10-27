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
app.use("/manager", async function (req, res, next) {
    let check = [];
    try {
        var decoded = jwt.verify(req.headers["authorization"], 'luongQuyet');
        let verifyInfo: Staff = decoded["0"];
        check = await MongoService._get("Staff", verifyInfo);
    } catch (error) {
        res.status(401)
        res.json("error token authentication");
    }
    if (check.length > 0) {
        next();
    }
    else {
        res.status(401)
        res.json("error token authentication");
    }
}, ManagerOwnerRouter)

app.use("/user", LoginCarOwnerRouter)

export { app };