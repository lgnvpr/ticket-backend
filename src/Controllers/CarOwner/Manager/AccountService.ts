import { get } from "mongoose";
import { Meta } from "../../../app";
import ResReturn from "../../../applications/ResReturn";
import { Account } from "../../../base-ticket/base-carOwner/Account";
import { Staff } from "../../../base-ticket/base-carOwner/Staff";
import { MongoService } from "../../MongoService";
var md5 = require('md5');
var jwt = require('jsonwebtoken');
const collection = "account"
export class AccountService {
    public static async list(ctx: Meta<any>): Promise<any> {
        var getData: any = await MongoService._list(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async create(ctx: Meta<Account>): Promise<any> {
        if (!ctx.params.username || !ctx.params.password) {
            return ResReturn.returnError("Vui lòng nhập đầy đủ thông tin")
        }
        let checkUserAvailable = await MongoService._getByQuery(collection, { username: ctx.params.username });
        if (checkUserAvailable?.length > 0 && !ctx.params._id) {
            return ResReturn.returnError("Tên tài khoản đã tồn tại")
        }
        ctx.params.password = md5(ctx.params.password);
        var getData: any = await MongoService._create(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async delete(ctx: Meta<any>): Promise<any> {
        let getData: any;
        if (ctx.params && ctx.params._id)
            getData = await MongoService.setInActive(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async getById(ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        ctx.params = {
            _id: params._id
        }
        var getData: any = await MongoService._get(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async login(ctx: Meta<Account>): Promise<any> {
        let params: any = ctx;
        var user: any = params.username;
        var password: any = md5(params.password || "");

        var query = {
            $and: [{ username: user }, { password: password }, { status: "active" }
            ]
        }
        let check: Account[] = await MongoService._getByQuery("account", query);


        if (check.length > 0) {
            try {
                let checkStaff: Staff[] = await MongoService._get("Staff", { params: { _id: check[0].staffId }, user: {} } as Meta<Staff>);
                let checkQuyen = await MongoService._get("PostionStaff", { params: { _id: checkStaff[0].positionId }, user: {} });

                if (!checkQuyen[0].useLogin) {
                    return ResReturn.returnError("Bạn không có quyền truy cập vào ứng dụng");

                }
            } catch (error) {
                return ResReturn.returnError("Password or User incorrect");
            }


            let getInfoAccount = await MongoService._getByQuery("Staff", { _id: check[0]?.staffId })
            let token = await jwt.sign({ ...getInfoAccount }, 'luongQuyet');
            return ResReturn.returnData(token);
        }

        return ResReturn.returnError("Password or User incorrect");
    }













}