import * as express from 'express';

import { AccountService } from '../../Controllers/CarOwner/Manager/AccountService';

const LoginCarOwnerRouter = express.Router();


LoginCarOwnerRouter.post("/login", async (req: express.Request, res: express.Response) => {
    
    let getRes = await AccountService.login(req.body)
    res.status(getRes.status)
    res.json(getRes.json);

})




export { LoginCarOwnerRouter }