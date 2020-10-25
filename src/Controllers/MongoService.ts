import { isForOfStatement } from '../../node_modules/typescript/lib/typescript';
import { MongoHelper } from '../mongo.helper'
import { Paging } from "../base-ticket/Paging"
import { parse } from '../../node_modules/ts-node/dist/index';
import { ISearch } from '../base-ticket/Query';
var mongo = require('mongodb');
export class MongoService {

    public static collection(collection: string): any {
        return MongoHelper.client.db("ticker").collection(collection);
    }

    public static async _get(collection: string, params: any): Promise<any> {
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

    public static async _list(collection: string, params: any): Promise<any> {
        let query = {};
        let search = {};
        console.log("\x1b[31m", `============list for ${collection}====================`);
        let page: number = parseInt(params.page) || 0

        if (params.query) {
            console.log("on Query with Query and page")
            let syntaxQuery = params.query;
            if (typeof syntaxQuery == "string") 
                syntaxQuery = JSON.parse(params.query);
            query = {
                $and: [syntaxQuery]
            }
        }
        if(params.search){
            let syntaxSearch = params.search;
            if (typeof syntaxSearch == "string") 
            syntaxSearch = JSON.parse(params.search);
            search = this.convertSeachsToQuery(params.search);
        }
        return this.queryByPaging(collection, page, {
            $and: [query,search, { status: "active" }
            ]
        });
    }

    public static async queryByPaging(collection, page, params: any): Promise<Paging<any>> {
        let getListData :[]=[];
        (page) 
         ? getListData = await this.collection(collection).find(params).limit(10).skip((page - 1) * 10).toArray() ||[]
        : getListData = await this.collection(collection).find(params).toArray() ||[];
        let getCount = await this.getPaging(collection, params);
        let pagingCollection: Paging<any> = {
            page: page,
            pageSize: getListData.length,
            rows: getListData,
            total: getCount,
            totalPages: Math.ceil(getCount / 10)
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
        return await this.collection(collection).find(query).toArray();
    }




    public static async _create(collection, params): Promise<any> {
        console.log("\x1b[31m", `============Create for ${collection}====================`);
        if (Array.isArray(params)) {
            params.map((params) => {
                console.log(`--------------------${params._id}--------------------`)
                params.status = "active",
                    params.createAt = new Date();
                params.updateAt = new Date();
                return params;
            })
            return this.collection(collection).insertMany(params)
                .then(res => { console.log(res);return res})
                .catch(err => err);
        }
        let customParams: any = { ...params, status: "active", updateAt: new Date() }
        delete customParams._id;
        if (params._id) {
            let _id = this.convertIdToIdObject(params._id);
            let checkCreate = await this._get(collection, { _id: params._id });
            if (checkCreate.length > 0) {
                return this.collection(collection).updateMany({
                    $or: [
                        { _id: _id },
                        { _id: params._id }
                    ]
                },
                    {
                        $set: customParams
                    }).then(res => customParams)
                    .catch(err => err)
            }
        }
        customParams.createAt = new Date();
        return this.collection(collection).insert(customParams)
            .then(res => res.ops[0])
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
        if (!searchs || (searchs &&searchs[0].content == "") ) return { $and: [{}] };
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
}

