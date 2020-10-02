import * as express from 'express';

import { CarService } from '../../Controllers/CarOwner/Manager/CarService';

const ManagerCarOwnerRouter = express.Router();


ManagerCarOwnerRouter.get("/", async (req: express.Request, res: express.Response) => {
    res.json( await CarService.get(req.body));
})

ManagerCarOwnerRouter.post("/", async(req: express.Request, res: express.Response) => {
    res.json(await CarService.create(req.body))
})

ManagerCarOwnerRouter.delete("/", async(req: express.Request, res: express.Response)=>{
    res.json(await CarService.delete(req.body));
})



export { ManagerCarOwnerRouter }