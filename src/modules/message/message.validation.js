import joi from "joi"
import { generalFieldsValidation } from "../../utils/validation/general.fields.validation.js";
export const sendMessage = joi.object({
    message: joi.string().required().min(5).max(50000).required(),
    receiverId:generalFieldsValidation.id
}).required();