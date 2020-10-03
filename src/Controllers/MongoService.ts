import { isForOfStatement } from '../../node_modules/typescript/lib/typescript';
import { MongoHelper } from '../mongo.helper'
import { Paging } from "../base-ticket/Paging"
var mongo = require('mongodb');
export class MongoService {

    public static collection(collection: string): any {
        return MongoHelper.client.db("ticker").collection(collection);
    }

    public static async _get(collection: string, params: any): Promise<any> {
        //    return  await this.getField(collection,"viTriDatSach","D5");

        if (params && params._id) {

            let _id = new mongo.ObjectID(params._id);
            return await this.collection(collection).find({
                $or: [
                    params,
                    { _id: _id }
                ]
            }).toArray();
        }
        if (Array.isArray(params)) {
            return await this.collection(collection).find({
                $and: [
                    { _id: { $in: params } },
                    { status: "active" }
                ]
            }).toArray();
        }
        return await this.collection(collection).find({ status: "active" }).toArray();
    }

    public static async _list(collection: string, params: any, page: number): Promise<any> {
        let getListData: [] = [];
        if (Array.isArray(params)) {
            getListData = await this.collection(collection).find({ _id: { $in: params } }).limit(10).skip((page - 1) * 10).toArray();
        }
        else {
            getListData = await this.collection(collection).find({ status: "active" }).limit(10).skip((page - 1) * 10).toArray();

        }

        return this.setPaging(collection, page, getListData);


    }

    public static async setPaging(collection, page, T: Array<any>): Promise<Paging<any>> {
        let getCount = await this.getPaging(collection);
        let pagingCollection: Paging<any> = {
            page: page,
            pageSize: T.length,
            rows: T,
            total: getCount,
            totalPages: Math.ceil(getCount / 10)
        }
        return pagingCollection;
    }

    public static async getPaging(collection: string): Promise<any> {
        let count = await this.collection(collection).aggregate([
            { $match: { status: "active" } },
            { $group: { _id: "count", count: { $sum: 1 } } }
        ]).toArray();
        if (count.length > 0) {
            return count[0].count
        }
        return 0;
    }


    public static async getByQuery(collection: string, query: any): Promise<any> {
        //    return  await this.getField(collection,"viTriDatSach","D5");
        return await this.collection(collection).find({ query }).toArray();
    }


    // public static async getField(collection, field, value): Promise<any> {
    //     if (Array.isArray(value)) {
    //         const syntax = `{
    //             ${field}: { $in: ${value} }
    //         }`;
    //         return await this.collection(collection).find(syntax).toArray();
    //     } else if (typeof value === "string") {
    //         const syntax = `{"${field}": "${value}"}`
    //         return this.collection(collection).find(syntax).toArray();
    //     }
    // }


    public static async _create(collection, params): Promise<any> {
        let customParams = { ...params, status: "active", updateAt: new Date() }
        if (customParams._id) {
            let checkCreate = await this._get(collection, { _id: customParams._id });
            if (checkCreate.length > 0)
                return this.collection(collection).updateMany({ _id: customParams._id }, {
                    $set: customParams
                })
                    .then(res => res)
                    .catch(err => err)
        }
        customParams.createAt = new Date();
        return this.collection(collection).insert(customParams)
            .then(res => res.ops)
            .catch(err => err);
    }

    public static _delete(collection, id: string): Promise<any> {
        return this.collection(collection).deleteOne({ _id: id }, true)
            .then((res) => {
                return res;
            })
            .catch(err => err)
    }

    public static setInActive(collection, id: string): Promise<any> {
        let _id = new mongo.ObjectID(id);
        return this.collection(collection).updateMany({ $or: [
            {_id : id},
            { _id: _id }
        ] }, {
            $set: { status: 'inactive', updateAt: new Date() }
        })
            .then(res => res.result)
            .catch(err => err)
    }


}