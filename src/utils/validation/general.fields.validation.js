import joi from "joi"
import { Types } from "mongoose"

export const validateObjectId = (value, helpers)=>{
    return Types.ObjectId.isValid(value)? true: helpers.message("invalid id")
}
export const generalFieldsValidation =  

    {
        username: joi.string(),
        email: joi.string().email(),
        password: joi.string().pattern(new RegExp(/[A-Z]+/) || !pwStr.match(/[a-z]+/) || !pwStr.match(/[0-9]+/)).required(),
        id:joi.string().custom(validateObjectId)
    }
 
