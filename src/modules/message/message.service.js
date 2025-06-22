import { MessageModel } from "../../db/models/message.model.js";
import { userModel } from "../../db/models/user.model.js";
import { asynchandler } from "../../utils/error/asynchandler.js";
import { successResponse } from "../../utils/success/success.response.js";

export const sendMessage = asynchandler(async (req,res,next)=>{
    const {message, receiverId} = req.body;
 
    const user = await userModel.findOne({_id:receiverId, isDeleted:false});
    if(!user){
        return next(new Error("not found", {cause:404}))
        }
        const newMessage = await MessageModel.create({message, receiverId:receiverId});
        successResponse({res, message:"message sent successfully",data:newMessage})

})