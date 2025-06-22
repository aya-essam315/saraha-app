
import {Router} from "express"
import * as messageServices from "./message.service.js"
import { validateSchema } from "../../middleware/validate.js"
import * as messageValidators from "./message.validation.js"

const router = Router()

router.post("/", 
    validateSchema(messageValidators.sendMessage),
    messageServices.sendMessage

)

export default router