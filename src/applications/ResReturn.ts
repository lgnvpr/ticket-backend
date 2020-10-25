
import * as express from 'express';

export default class ResReturn{
    public static returnError(nameError : string) :  express.Response { 
        let res : any = {
            status : 500,
            json : { 
                status : 500,
                message : nameError
            }  
        };
        return res;
    }

    public static returnData(data : any ) : express.Response{
        let res : any = { 
            status : 200,
            json : data
        }
        return res;
    } 

    public static getDataRes(data : any ) : any{
        return data.json;
    }

    
}