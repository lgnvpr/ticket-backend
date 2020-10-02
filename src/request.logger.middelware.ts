import { log } from 'console';
import { resolveSoa } from 'dns';
import * as express from 'express';
const requestLoggerMiddleware = (req : express.Request, resp : express.Response, next : express.NextFunction)=>{
    console.log(`${req.method} == ${req.originalUrl}`);
    const start = new Date().getTime();
    resp.on('finish', ()=>{
        const elapsed = new Date().getTime() - start;
        console.log(`${req.method} == ${resp.statusCode} == ${elapsed}ms`)
        resp.send("error jwt");
    })
    next();
};

export {requestLoggerMiddleware};