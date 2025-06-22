import { userModel } from "../../../db/models/user.model.js";
import { hashData } from "../../../utils/security/hashing/hash.js";
import {compareHashedData} from "../../../utils/security/hashing/compare.js"
import { decryptData, encryptData } from "../../../utils/security/encryption/crypto.js";
import { generateToken, verifyToken } from "../../../utils/security/token/token.js";
// import { sendEmail } from "../../../utils/email/sendemail.js";
import { emailEvent } from "../../../utils/email/email-event.js";
import { asynchandler } from "../../../utils/error/asynchandler.js";
import { successResponse } from "../../../utils/success/success.response.js";




export const signUp = asynchandler(async (req,res, next)=>{
    // console.log(req.body);
 
     const {username, email, password, cpassword, phone} = req.body;
     if(password !== cpassword){
        return next(new Error("Password and Confirm Password doesn't match.", {cause:409}))
     }
     const user = await userModel.findOne({email})
     if(user){
            return next(new Error("emai already exists and Confirm Password doesn't match.", {cause:409}))
        }
        const hashedPassword = hashData({data:password});
        const encryptedPhone = encryptData({data:phone,  })
   
   
    const createdUser = await userModel.create({username, email, password:hashedPassword, phone:encryptedPhone});

    emailEvent.emit("sendConfirmEmail", {email})
//    console.log(sent);
   

    return res.status(201).json({message: "User created successfully", createdUser})


    
}
)
export const confirmEmail = asynchandler(
    async(req,res,next)=>{
   
        const {authorization} = req.headers;
        const {email} = verifyToken({token:authorization, secreteKey:process.env.EMAIL_JWT_SECRET})
        // console.log(email);
        const user = await userModel.findOne({email})
        if(!user){
        return next(new Error("user not found", {cause:404}))
        }
        user.confirmEmail = true
        await user.save()
        return res.status(200).json({message: "Email confirmed successfully"})
    
}
)


export const login = asynchandler(
    async(req,res,next)=>{
  
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
             return next(new Error("user not found", {cause:404}))
            }
            const isMatched = compareHashedData({data:password, hashedData:user.password});
            if(!isMatched){
                    return next(new Error("Invalid creditionals", {cause:409}))
                }
               if(!user.confirmEmail){
        return next(new Error("amail not confirmed, pls confirm ur email first", {cause:409}))
               }
               if(user.isDeleted==true){
                user.isDeleted = false
                await user.save()
               }
                
        const token = generateToken({payload:{id:user._id},
            //  options: {expiresIn: 60 * 60 }
            secreteKey: user.role="admin"? process.env.JWT_SECRET_ADMIN: process.env.JWT_SECRET
            });
        // console.log("kk");
        

       user.phone = decryptData({data:user.phone})
    //    console.log(user);
       
       
    return successResponse({res, message:"loged in successfully", statusCode:200, data:{token}})
        
   
}
)