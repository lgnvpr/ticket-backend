import { get } from "mongoose";
import ResReturn from "../../../applications/ResReturn";
import { Account } from "../../../base-ticket/base-carOwner/Account";
import { MongoService } from "../../MongoService";
var md5 = require('md5');
var jwt = require('jsonwebtoken');
const collection = "account"
export class AccountService {
    public static async list(params: any): Promise<any> {
        var getData: any = await MongoService._list(collection, params);
        return ResReturn.returnData(getData);
    }

    public static async create(params: any): Promise<any> {
        params.password = md5(params.password);
        var getData: any = await MongoService._create(collection, params);
        return ResReturn.returnData(getData);
    }

    public static async delete(params: any): Promise<any> {
        let getData: any;
        if (params && params._id)
            getData = await MongoService.setInActive(collection, params._id);
        return ResReturn.returnData(getData);
    }

    public static async getById(params: any): Promise<any> {
        var getData: any = await MongoService._get(collection, params);
        return ResReturn.returnData(getData);
    }

    public static async login(params: any): Promise<any> {
        var user: any = params.username;
        var password: any = md5(params.password || "");

        var query = {
            $and: [{username : user},{password : password}, { status: "active" }
            ]
        }
        let check : Account[]=await MongoService._getByQuery("account", query);

        if (user == "admin" && password == md5(params.password || "")) {
            return ResReturn.returnData(user);
        }

        if (check.length > 0) {
            let getInfoAccount = await MongoService._getByQuery("Staff", { _id: check[0]?.staffId })
            let token = await jwt.sign({ ...getInfoAccount}, 'luongQuyet');
            return ResReturn.returnData(token);
        }

        return ResReturn.returnError("Password or User incorrect");

    }













}