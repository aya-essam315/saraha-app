
import mongoose, {Schema, model} from "mongoose";

export const Gender = {
    MALE: "male",
    FEMALE: "female",
}
export const Roles = {
    ADMIN: "admin",
    USER: "user",
}

const userSchema = new Schema({
    username: {type:String, required: true},
    email:{type: String, unique: true, required: true},
    password: {type:String, required: true},
    gender:{type:String, required: true, enum: Object.values(Gender), default: Gender.MALE},
    DOB:Date,
    image:String,
    phone: String,
    address: String,
    confirmEmail:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum: Object.values(Roles),
        default: Roles.USER
    },
    changePasswordTime:{type:Date},
    isDeleted:{type:Boolean, default:false}

},{timestamps:true})


export const userModel =  mongoose.models.User ||model("User", userSchema);