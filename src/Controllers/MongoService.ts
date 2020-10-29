import { isForOfStatement } from '../../node_modules/typescript/lib/typescript';
import { MongoHelper } from '../mongo.helper'
import { Paging } from "../base-ticket/Paging"
import { parse } from '../../node_modules/ts-node/dist/index';
import { ISearch } from '../base-ticket/Query';
import { Context, Meta } from '../app';
import { firebase } from '../../FireBaseConfig';
var mongo = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const fireStoreFirebase = firebase.firestore();

export class MongoService {

    public static collection(collection: string): any {
        return MongoHelper.client.db("ticker").collection(collection);
    }

    public static async _get(collection: string, ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        console.log("\x1b[31m", `============Create for ${collection}====================`);

        if (params && params._id) {
            let _id = this.convertIdToIdObject(params._id);

            return await this.collection(collection).find({
                $or: [
                    params,
                    { _id: _id }
                ]
            }).toArray();
        }
        if (Array.isArray(params)) {

            let _ids: any = params.map((_id: any) => {
                return this.convertIdToIdObject(_id);
            })
            return await this.collection(collection).find({
                $and: [
                    { _id: { $in: _ids } }
                ]
            }).toArray();
        }
        return await this.collection(collection).find({ status: "active" }).toArray();
    }

    public static async _list(collection: string, ctx: Meta<any>): Promise<any> {
        let params: any = ctx.params;
        console.log(params);
        let query = {};
        let search = {};
        console.log("\x1b[31m", `============list for ${collection}====================`);
        let page: number = parseInt(params.page) || 0

        if (params.query) {


            let syntaxQuery = {};
            syntaxQuery = params.query;
            if (typeof syntaxQuery == "string")
                syntaxQuery = JSON.parse(params.query);


            query = {
                $and: [syntaxQuery]
            }
            console.log(query)
        }
        if (params.search) {
            let syntaxSearch = params.search;
            if (typeof syntaxSearch == "string")
                syntaxSearch = JSON.parse(params.search);
            search = this.convertSeachsToQuery(params.search);
            console.log("orror at sytax")
        }
        return this.queryByPaging(collection, page, {
            $and: [query, search, { status: "active" }
            ]
        });
    }

    public static async queryByPaging(collection, page, params: any): Promise<Paging<any>> {
        console.log("start query")
        let getListData: [] = [];
        (page)
            ? getListData = await this.collection(collection).find(params).limit(6).skip((page - 1) * 6).toArray() || []
            : getListData = await this.collection(collection).find(params).toArray() || [];
        let getCount = await this.getPaging(collection, params);
        let pagingCollection: Paging<any> = {
            page: page,
            pageSize: getListData.length,
            rows: getListData,
            total: getCount,
            totalPages: Math.ceil(getCount / 6)
        }
        return pagingCollection;
    }

    public static async getPaging(collection: string, params: any): Promise<any> {
        let count = await this.collection(collection).aggregate([
            { $match: params },
            { $group: { _id: "count", count: { $sum: 1 } } }
        ]).toArray();
        if (count.length > 0) {
            return count[0].count
        }
        return 0;
    }


    public static async _getByQuery(collection: string, query: any): Promise<any> {
        return await this.collection(collection).aggregate([
            { $match: query }
        ]).toArray();
    }


    public static async _Query(collection: string, query: any): Promise<any> {
        return await this.collection(collection).aggregate(query).toArray();
    }


    public static async _create(collection, ctx: Meta<any>): Promise<any> {


        let params: any = ctx.params;
        console.log("\x1b[31m", `============Create for ${collection}====================`);
        if (Array.isArray(params)) {
            params.map((params) => {
                console.log(`--------------------${params._id}--------------------`)
                params.status = "active",
                params.createAt = new Date();
                params._id = uuidv4()
                params.updateAt = new Date();
                params.updateBy = ctx.user._id;
                params.createBy = ctx.user._id;
                return params;
            })
            this.addNotificationsFirebase(ctx, collection, "create")
            return this.collection(collection).insertMany(params)
                .then(res => { console.log(res); return res })
                .catch(err => err);
        }
        let customParams: any = { ...params, status: "active", updateAt: new Date() }
        delete customParams._id;
        if (params?._id) {
            let _id = this.convertIdToIdObject(params._id);
            let checkCreate = await this._get(collection, { params: { _id: params._id }, user: ctx.user } as Meta<any>);
            if (checkCreate.length > 0) {
                this.addNotificationsFirebase(ctx, collection, "update")
                return this.collection(collection).updateMany({
                    $or: [
                        { _id: _id },
                        { _id: params._id }
                    ]
                },
                    {
                        $set: customParams
                    }).then(res => {return {...customParams, _id : params._id}})
                    .catch(err => err)
            }
        }

        customParams.createAt = new Date();
        customParams.createBy = ctx.user._id;
        customParams._id = uuidv4();
        this.addNotificationsFirebase(ctx, collection, "create")
        return this.collection(collection).insert(customParams)
            .then(res => customParams)
            .catch(err => err);
    }

    public static _delete(collection, id: string): Promise<any> {

        return this.collection(collection).deleteOne({ _id: id }, true)
            .then((res) => {
                return res;
            })
            .catch(err => err)
    }

    public static setInActive(collection, ctx: Meta<any>): Promise<any> {
        this.addNotificationsFirebase(ctx, collection, "delete")
        let id =ctx?.params?._id 
        let _id = this.convertIdToIdObject(id);
        return this.collection(collection).updateMany({
            $or: [
                { _id: id },
                { _id: _id }
            ]
        }, {
            $set: { status: 'inactive', updateAt: new Date() }
        })
            .then(res => res.result)
            .catch(err => err)
    }

    public static convertIdToIdObject(id: string): any {
        try {
            return new mongo.ObjectID(id);
        } catch (error) {
            return id;
        }
    }

    public static createQueryForListId(arr: Array<any>): any {
        return {
            $and: [
                { _id: { $in: arr } }
            ]
        }
    }

    private static convertSeachsToQuery(searchs: ISearch[]) {
        let childQueries: Array<any> = new Array();
        if (!searchs || (searchs && searchs[0].content == "")) return { $and: [{}] };
        searchs?.map((item) => {
            if (item && typeof item == "string") {
                item = JSON.parse(item);
            }
            item.fields?.map((field) => {
                let json = `{\"${field}\":{\"$regex\":\"${item.content}\",\"$options\":\"i\"}}`
                childQueries.push(JSON.parse(json))
            });
        });
        return {
            $or: childQueries
        };
    }

    private static async addNotificationsFirebase(ctx: Meta<any>, collection, action) {

        switch (action) {
            case "update":
                action = "cập nhật"
                break;

            case "delete":
                action = "xóa"
                break;

            case "create":
                action = "thêm"
                break;
            default:
                action = "thao tác trên"
                break;
        }

        switch (collection) {
            case "account":
                collection = "tài khoản nhân viên"
                break;
            case "Car":
                collection = "xe"
                break;
            case "ChairCar":
                collection = "loại xe"
                break;
            case "Customer":
                collection = "khách hàng"
                break;
            case "PostionStaff":
                collection = "Chức vụ"
                break;
            case "Route":
                collection = "lộ trình"
                break;
            case "Staff":
                collection = "nhân viên"
                break;
            case "Ticket":
                collection = "vé xe"
                break;
            case "Trip":
                collection = "chuyến đi"
                break;
            case "TypeCar" : collection = "loại xe"
            default:
                break;
        }


        const docRef = await fireStoreFirebase
            .collection("notification")
            .doc("notification");
        await docRef.set({
            title: `Thao tác ${action} mới`,
            time: new Date(),
            content:`${ctx.user.name} vừa ${action} ${collection}`
        });
    }
}

