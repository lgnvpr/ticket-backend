import { Car } from "../base-ticket/base-carOwner/Car";
import { Customer, Sex } from "../base-ticket/base-carOwner/Customer";
import { PostionStaff } from "../base-ticket/base-carOwner/PostionStaff";
import { Route } from "../base-ticket/base-carOwner/Route";
import { Staff } from "../base-ticket/base-carOwner/Staff";
import { TypeCar } from "../base-ticket/base-carOwner/TypeCar";
import { Status } from "../base-ticket/BaseModel";
const { v4: uuidv4 } = require('uuid');

export const randomSex = (): Sex => {
    return (Math.floor(Math.random() * 3) % 2 == 0)
        ? Sex.male
        : Sex.female
}

export const randomPHone = (): string => {
    let phone: number = 100000000 + Math.floor(Math.random() * 1000000000);
    return `09${phone}`
}


export const randomCmnd = (): string => {
    let phone: number = 100000000 + Math.floor(Math.random() * 1000000000);
    return `${phone}`
}

export const randomBirthDay = (): Date => {
    let getDate = new Date();
    getDate.setDate(getDate.getDate() + Math.floor(Math.random() * 30));
    getDate.setMonth(getDate.getMonth() + Math.floor(Math.random() * 12));
    getDate.setFullYear(getDate.getFullYear() - Math.floor(Math.random() * 20));
    return getDate;
}

export const randomHourAndMinute = (): Date => {
    let getDate = new Date();
    getDate.setHours(getDate.getHours() + Math.floor(Math.random() * 23));
    getDate.setMinutes(0);
    return getDate;
}

export const radomLicensePlates = (): string => {
    return `${Math.floor(Math.random() *90 +1)}A - ${1000+ Math.floor(Math.random() *8999)}`
}

export let Country = [
    "Kon Tum", "Bà Rịa – Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Lai Châu", "Lạng Sơn"
    , "Lâm Đồng", "Bạc Liêu", "Lào Cai", "Bắc Ninh", "Long An", "Bến Tre", "Nam Định",
    "Bình Định", "Bình Dương", "Nghệ An", "Bình Phước", "Ninh Bình", "Ninh Thuận", "Bình Thuận",
    "Phú Thọ", "Cà Mau", "Phú Yên", "Cần Thơ", "Cao Bằng", "Quảng Bình", "Quảng Nam", "Đà Nẵng",
    "Quảng Ngãi", "Đắk Lắk", "Quảng Ninh", "Đắk Nông", "Quảng Trị", "Điện Biên", "Sóc Trăng", "Đồng Nai",
    "Sơn La", "Đồng Tháp", "Tây Ninh", "Gia Lai", "Thái Bình", "Hà Giang", "Thái Nguyên", "Hà Nam", "Thanh Hóa",
    "Hà Nội", "Thừa Thiên Huế", "Hà Tĩnh", "Tiền Giang", "TP Hồ Chí Minh", "Hải Dương", "Trà Vinh", "Hải Phòng",
    "Hậu Giang", "Tuyên Quang", "Hòa Bình", "Vĩnh Long", "Vĩnh Phúc", "Hưng Yên", "Khánh Hòa", "An Giang", "Kiên Giang", "Yên Bái"
]

export let name = ["Nguyễn Thị Hồng Hạnh",
    "Trần Thị Ngọc Thảo", "Trần Thị Trinh",
    "Nguyễn Hà Việt Trinh", "Trần Triệu Thông",
    "Đinh Thái Sơn", "Nguyễn Thị Ngọc Anh",
    "Lê Nguyễn Quang Thái", "Phạm Thiên An",
    "Đào Phương Vy Uyên", "Đinh Quốc Minh",
    "Ngô Thị Như Quỳnh",
    "Phạm Từ Thái Thanh", "Nguyễn Đình Vương Nguyên",
    "Lê Thị Tiểu Chi", "Nguyễn Lê Thiên Phát",
    "Lê Thị Hoài Phương", "Lê Trung Quý",
    "Trần Đức Tuấn", "Bế Tuấn Anh",
    "Phạm Ngọc Đông", "Lê Bảo Ngọc Tường",
    "Nguyễn Thị Lâm Oanh", "Đỗ Thị Bảo Thoa",
    "Nguyễn Quốc Khánh", "Phạm Quỳnh Trinh",
    "Nguyễn Lê Thu Uyên", "Trần Thái Bảo",
    "Lê Khánh Huy", "Cao Quang Ngọc Bảo",
    "Nguyễn Văn Hải", "Võ Chí Sơn",
    "Trần Tiến Đạt", "Nguyễn Tự Quyết",
    "Lê Đăng Khôi Byă", "Đặng Văn Trung",
    "Vũ Thị Khánh Linh", "Nguyễn Thái Anh Duy",
    "Võ Văn Tuấn", "Hảng A Vinh",
    "Y Nhơ Mlô", "Vũ Văn Bằng",
    "Trương Phú Đồng"
]

export let postion = [
    "Giám đốc điều hành", "Nhân viên bán hàng", "Tài xế", "Lơ xe", "Nhân viên dọn dẹp", "Thư kí", "Kế toán", "Nhân viên kiểm soát", "Nhân viên soát vé",
    "Nhân viên kiểm tra chất lượng", "Nhân viên dọn dẹp", "Nhân viên rửa xe", "Đội trưởng đội rửa xe"
]

export let nameTypeCar = [
    "Xe giuờng nằm cao cấp HuynhDai", "Xe đưa đón rung chuyển HuynhDai", "Xe giường nằm nhập khẩu đài loan", "Xe giường nằm 2 tầng", ""
]

export let country = [
    "Trung Quốc","Nhật Bản", "Hàn Quốc","Thái Lan", "Việt Nam"
]







export const carData: Car = {
    _id : uuidv4(),
    createAt: new Date(),
    description: "No description",
    entryAt: randomBirthDay(),
    licensePlates: "",
    name: "",
    origin: "",
    status: Status.actived,
    typeCarId: "",
    updateAt: new Date(),
    statusCar: "using", 
}

export const routeData: Route = {
    _id : uuidv4(),
    createAt: new Date(),
    localEnd: "",
    localStart: "",
    startAt: new Date(),
    status: Status.actived,
    sumTimeRun: Math.floor(Math.random() * 5 + 5)
}

export const customer: Customer = {
    _id : uuidv4(),
    BirthAt: randomBirthDay(),
    CMND: randomCmnd(),
    createAt: new Date(),
    description: "Cusomer",
    email: "",
    name: "",
    sex: randomSex(),
    status: Status.actived,
    phoneNumber: randomPHone(),
    updateAt : new Date()
}