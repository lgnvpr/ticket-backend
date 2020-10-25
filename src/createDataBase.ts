import { app } from "./app";
import * as http from "http";
import * as data from "./DataBase/dataBase"
import { MongoHelper } from "./mongo.helper";
import { MongoService } from "./Controllers/MongoService";
import { PostionStaff } from "./base-ticket/base-carOwner/PostionStaff";
import { Staff } from "./base-ticket/base-carOwner/Staff";
import { TypeCar } from "./base-ticket/base-carOwner/TypeCar";
import { Car } from "./base-ticket/base-carOwner/Car";
import { Status } from "./base-ticket/BaseModel";
import { Customer } from "./base-ticket/base-carOwner/Customer";
import { Route } from "./base-ticket/base-carOwner/Route";
const { v4: uuidv4 } = require('uuid');

create();
async function create() {

    try {
        await MongoHelper.connect(process.env.MONGO_URI);
        console.info('Connected to Mongo.');

        let namePostion = data.postion;
        let listPostion: PostionStaff[] = [];
        for (let i = 0; i < namePostion.length; i++) {
            listPostion.push({
                _id: uuidv4(),
                name: namePostion[i],
                description: "This a postion",
            })
        }
        await MongoService._create("PostionStaff", listPostion);
        console.log(listPostion);

        let listName: string[] = data.name;
        let listStaff: Staff[] = [];
        for (let i = 0; i < listName.length; i++) {
            listStaff.push({
                _id: uuidv4(),
                address: data.Country[Math.floor(Math.random() * data.Country.length)],
                birthAt: data.randomBirthDay(),
                status: Status.actived,
                identityCard: data.randomCmnd(),
                name: listName[i],
                phoneNumer: data.randomPHone(),
                sex: data.randomSex(),
                createAt: new Date(),
                updateAt: new Date,
                positionId: listPostion[Math.floor(Math.random() * listPostion.length - 2)]?._id
            })
        }
        await MongoService._create("Staff", listStaff);
        
        let getTypeCarName: string[] = data.nameTypeCar;
        let listTypeCar: TypeCar[] = [];
        for (let i = 0; i < getTypeCarName.length; i++) {
            listTypeCar.push({
                description: "No Description",
                nameTypeCar: getTypeCarName[i]
            })
        }
        await MongoService._create("TypeCar", listTypeCar);

        
        let listCar: Car[] = [];
        for (let i = 0; i < 20; i++) {
            listCar.push({
                _id: uuidv4(),
                createAt: new Date(),
                description: "No description",
                entryAt: data.randomBirthDay(),
                licensePlates: data.radomLicensePlates(),
                name: `Lương Quyết${i+1}`,
                origin: data.country[Math.floor(Math.random() * data.country.length)],
                status: Status.actived,
                typeCarId: listTypeCar[Math.floor(Math.random() * listTypeCar.length)]._id,
                updateAt: new Date(),
                statusCar: "using",

            })
        }
        await MongoService._create("Car", listCar);
        
        let listCustomer : Customer[] = []
        for (let i = 0; i < listName.length; i++) {
            listCustomer.push({
                _id : uuidv4(),
                BirthAt: data.randomBirthDay(),
                CMND: data.randomCmnd(),
                createAt: new Date(),
                description: "Cusomer",
                email: "",
                name: listName[i],
                sex: data.randomSex(),
                status: Status.actived,
                phoneNumber: data.randomPHone(),
                updateAt : new Date()
            })
            
        }

        await MongoService._create("Customer", listCustomer);

        //tạo chuyến đi 
        let listRouter: Route[] = []
        for (let i = 0; i < 20; i++) {
            let end = data.Country[Math.floor(Math.random() * data.Country.length)];
            listRouter.push({
                _id: uuidv4(),
                localEnd: data.Country[Math.floor(Math.random() * data.Country.length)], 
                localStart : data.Country[Math.floor(Math.random() * data.Country.length)],
                sumTimeRun: Math.floor(Math.random() * 10 + 5)
            })            
        }
        listRouter.filter(router => {
            return router.localEnd != router.localStart
        })

        await MongoService._create("Route", listRouter);


    } catch (err) {
        console.log(err);
    }
}

