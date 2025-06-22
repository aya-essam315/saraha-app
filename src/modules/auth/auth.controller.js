
import { Router } from "express";
import * as registeration from "./service/registeration.service.js"
import { validateSchema } from "../../middleware/validate.js";
import * as authValidation from "./auth.validation.js";
const router = Router();

router.post("/signup",
    validateSchema(authValidation.signupValidation),
     registeration.signUp)
router.post("/confirm-email", registeration.confirmEmail)
router.post("/login", registeration.login)

export default router