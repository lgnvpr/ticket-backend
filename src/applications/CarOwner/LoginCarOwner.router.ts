import * as express from 'express';

import { CarService } from '../../Controllers/CarOwner/Manager/CarService';

const LoginCarOwnerRouter = express.Router();


LoginCarOwnerRouter.post("/login", async (req: express.Request, res: express.Response) => {
    let getRes = await CarService.list(req.body)
    res.status = getRes.status;
    res.json(getRes.json);

})

LoginCarOwnerRouter.put("/", async(req: express.Request, res: express.Response) => {
    let getRes = await CarService.create(req.body)
    res.status = getRes.status;
    res.json(getRes.json);
})

LoginCarOwnerRouter.post("/", async(req: express.Request, res: express.Response)=>{
    let getRes = await CarService.delete(req.body)
    res.status = getRes.status;
    res.json(getRes.json);
})



export { LoginCarOwnerRouter }