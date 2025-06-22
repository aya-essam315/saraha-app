import joi from "joi"
import { generalFieldsValidation } from "../../utils/validation/general.fields.validation.js"

export const signupValidation = joi.object(
    {
   
 
        username:generalFieldsValidation.username.required(),
        email:generalFieldsValidation.email.required(),
        password:generalFieldsValidation.password.required(),
        cpassword: joi.string().valid(joi.ref('password')).required(),
        phone:joi.string(),
        DOB:joi.date().less("now") //mm-dd-yyyy

    }
).required()