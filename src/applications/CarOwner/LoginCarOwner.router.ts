import * as express from 'express';

import { CarService } from '../../Controllers/CarOwner/Manager/CarService';

const LoginCarOwnerRouter = express.Router();


LoginCarOwnerRouter.get("/", async (req: express.Request, res: express.Response) => {
    res.json( await CarService.get(req.body));
})

LoginCarOwnerRouter.post("/", async(req: express.Request, res: express.Response) => {
    res.json(await CarService.create(req.body))
})

LoginCarOwnerRouter.delete("/", async(req: express.Request, res: express.Response)=>{
    res.json(await CarService.delete(req.body));
})



export { LoginCarOwnerRouter }