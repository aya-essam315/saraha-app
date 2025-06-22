import { MessageModel } from "../../../db/models/message.model.js";
import { userModel } from "../../../db/models/user.model.js";
import { asynchandler } from "../../../utils/error/asynchandler.js";
import { decryptData } from "../../../utils/security/encryption/crypto.js";
import { compareHashedData } from "../../../utils/security/hashing/compare.js";
import { hashData } from "../../../utils/security/hashing/hash.js";
import {successResponse} from "../../../utils/success/success.response.js"

export const profile = asynchandler(
    async(req,res,next)=>{

        req.authUser.phone = decryptData({data:req.authUser.phone})
        const messages = await MessageModel.find({receiverId:req.authUser.id})
 
     successResponse({res, message:"done", data:{messages, user:req.authUser}})
  
        
  
}
)

export const uploadProfilePic = asynchandler(
    async (req, res, next) => {
const updatedUser = await userModel.findByIdAndUpdate(req.authUser._id, {image: req.file.path},{new:true})
  return res.status(200).json({success:true, data:updatedUser, message:"profile pic added successfully"})
    }
)

export const updateProfile = asynchandler(
    async(req,res,next)=>{
        const user = await userModel.findByIdAndUpdate(req.authUser.id, req.body, {new: true, runValidators: true})
        successResponse({res, message:"updated successfully", data:user})
    }
)

export const updatePassword = asynchandler( 
    async(req,res,next)=>{
        const {oldPassword, newPassowrd, cNewPassword} = req.body;
        // console.log(req.authUser);
        

        if(!compareHashedData({data:oldPassword, hashedData:req.authUser.password})){
              return next(new Error("invalid old password",{cause:409}))
        }
        // if(compareHashedData({data:newPassowrd, hashedData:req.authUser.password}) ){
        //     return next(new Error("u can not use old password"))
        // }
        if(newPassowrd !== cNewPassword){
            return next(new Error("passwords do not match",{cause:409}))
            }
        const hashedPassword = hashData({data:newPassowrd})
        const user = await userModel.findByIdAndUpdate(req.authUser.id, {password: hashedPassword, changePasswordTime:Date.now()}, {new: true, runValidators: true})
        successResponse({res, message:"password updated successfully", data:user})
    }
)


export const freezProfile = asynchandler(
    async(req,res,next)=>
        {
            const user = await userModel.findByIdAndUpdate(req.authUser.id, {isDeleted: true}, {new: true})
            successResponse({res, message:"profile freezed successfully", })
        }
        )


export const getUserProfile = asynchandler(
    async(req,res,next)=>{
        const {userId} = req.params;
        console.log(userId);
        
        const user = await userModel.findOne({_id:userId, isDeleted:false}).select("username image")
        if(!user){
            return next(new Error("user not found",{cause:404}))
            }
            successResponse({res, message:"user profile found successfully", data:user})
    }
)