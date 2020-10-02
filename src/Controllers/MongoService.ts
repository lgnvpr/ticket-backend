import { isForOfStatement } from '../../node_modules/typescript/lib/typescript';
import { MongoHelper } from '../mongo.helper'

export class MongoService {

    public static collection(collection: string): any {
        return MongoHelper.client.db("ticker").collection(collection);
    }

    public static async get(collection: string, params: any): Promise<any> {
        //    return  await this.getField(collection,"viTriDatSach","D5");
        if (params && params._id)
            return await this.collection(collection).find(params).toArray();

        if (Array.isArray(params)) {
            return await this.collection(collection).find({ _id: { $in: params } }).toArray();
        }

        return await this.collection(collection).find({}).toArray();
    }

    public static async getField(collection, field, value): Promise<any> {
        if (Array.isArray(value)) {
            const syntax = `{
                ${field}: { $in: ${value} }
            }`;
            return await this.collection(collection).find(syntax).toArray();
        } else if (typeof value === "string") {
            const syntax = `{"${field}": "${value}"}`
            return this.collection(collection).find(syntax).toArray();
        }
    }


    public static async create(collection, params): Promise<any> {
        if (params._id) {
            let checkCreate = await this.get(collection, { _id: params._id });
            if (checkCreate.length > 0)
                return this.collection(collection).updateMany({ _id: params._id }, {
                    $set: params
                })
                    .then(res => res)
                    .catch(err => err)
        }
        return this.collection(collection).insert(params)
            .then(res => res.ops)
            .catch(err => err);
    }

    public static delete(collection, id: string): Promise<any> {
        return this.collection(collection).deleteOne({ _id: id }, true)
            .then((res) => {
                return res;
            })
            .catch(err => err)

    }


}