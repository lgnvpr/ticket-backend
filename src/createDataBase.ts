import { app } from "./app";
import * as http from "http";
import * as data from "./DataBase/dataBase"
import { MongoHelper } from "./mongo.helper";
import { MongoService } from "./Controllers/MongoService";

create();
async function create() {

    try {
        await MongoHelper.connect(process.env.MONGO_URI);
        console.info('Connected to Mongo.');
        let Data = data.staff;
        await MongoService._create('Staff', Data);

    } catch (err) {
        console.log(err);
    }
}

