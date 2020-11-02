import { get } from "mongoose";
import { Meta } from "../../../app";
import ResReturn from "../../../applications/ResReturn";
import { Account } from "../../../base-ticket/base-carOwner/Account";
import { Car } from "../../../base-ticket/base-carOwner/Car";
import { PostionStaff } from "../../../base-ticket/base-carOwner/PostionStaff";
import { Staff } from "../../../base-ticket/base-carOwner/Staff";
import { Paging } from "../../../base-ticket/Paging";
import { MongoService } from "../../MongoService";

const collection = "Staff"
export class StaffService {
    public static async list(ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        var getData: Paging<Staff> = await MongoService._list(collection, ctx);
        var postionStaffIds: Array<string> = getData.rows.map((staff: Staff) => staff.positionId);
        var staffIds: Array<string> = getData.rows.map((staff: Staff) => staff._id)
        var getPostionStaff: any = await MongoService._get("PostionStaff", { ...ctx, params: postionStaffIds });
        var getAccount: Paging<Account> = await MongoService._list("account", {
            ...ctx, params: {
                query : {
                    staffId: { $in: staffIds }
                }
            }
        }
        )

        getData.rows.map((staff: Staff) => {
            staff.position = getPostionStaff.find((position: PostionStaff) => position._id == staff.positionId)
            staff.account = getAccount.rows.find((account: Account) => account.staffId == staff._id)
            return staff;
        })

        return ResReturn.returnData(getData);
    }

    public static async create(ctx: Meta<Staff>): Promise<any> {
        let staff: Staff = ctx.params;
        if (!staff.avt) {
            if (!staff || !staff.address || !staff.birthAt || !staff.identityCard || !staff.name || !staff.phoneNumer || !staff.positionId) {
                return ResReturn.returnError("Vui lòng nhập đầy đủ thông tin");
            }
        }
        var getData: any = await MongoService._create(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async delete(ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        let getData: any;
        if (params && params._id)
            getData = await MongoService.setInActive(collection, ctx);
        return ResReturn.returnData(getData);
    }

    public static async getById(ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        var getData: any = await MongoService._get(collection, { ...ctx, params: { _id: ctx.params.id } });
        return ResReturn.returnData(getData);
    }













}