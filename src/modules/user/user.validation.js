import joi from "joi"
import { generalFieldsValidation } from "../../utils/validation/general.fields.validation.js"
export const updateProvileValidation = joi.object({
    username:generalFieldsValidation.username,
    phone:joi.string(),
    DOB: joi.date().less("now")
   
}).required()


export const updatePassword = joi.object({
    oldPassword:generalFieldsValidation.password.required(),
    newPassowrd:generalFieldsValidation.password
    .not(joi.ref("oldPassword"))
    .required()
    .messages({"message":"new password is the same as old password"}),
    cNewPassword:joi.string().valid(joi.ref("newPassowrd")).required()
  
}).required()