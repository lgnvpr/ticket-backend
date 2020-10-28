import * as express from 'express';
import { Meta } from '../../app';
import { Staff } from '../../base-ticket/base-carOwner/Staff';

import { AccountService } from '../../Controllers/CarOwner/Manager/AccountService';
import { MongoService } from '../../Controllers/MongoService';
var jwt = require('jsonwebtoken');

const LoginCarOwnerRouter = express.Router();


LoginCarOwnerRouter.post("/login", async (req: express.Request, res: express.Response) => {
    console.log("data on login ")
    console.log(req.body)
    let getRes = await AccountService.login(req.body)
    res.status(getRes.status)
    res.json(getRes.json);
})


LoginCarOwnerRouter.get("/getMe", async (req: express.Request, res: express.Response) => {
    let check = [];
    try {

        var decoded = jwt.verify(req.headers["authorization"], 'luongQuyet');

        let verifyInfo: Staff = decoded["0"];
        check = await MongoService._get("Staff", {params : verifyInfo,user : {}}as Meta<Staff>);
    } catch (error) {
        res.status(401)
        res.json("error token authentication");
    }
    if (check.length > 0) {

        res.json(check[0]);
    }
    else {
        res.status(401)
        res.json("error token authentication");
    }
})



export { LoginCarOwnerRouter }