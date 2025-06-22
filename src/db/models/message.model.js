
import   mongoose, { Schema, model , Types} from "mongoose";

const messageSchema = new Schema({
    message: {type:String, required:true, trim:true, maxLength:50000, minLength:5},
    receiverId : {type:  Types.ObjectId, ref: 'User'},
},{timestamps:true})

export const MessageModel = mongoose.models.Message || model('Message', messageSchema);