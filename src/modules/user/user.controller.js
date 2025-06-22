
import {Router} from 'express';
import * as userService from "./service/user.service.js"
import { authentication } from '../../middleware/authentication.js';
import { authorization } from '../../middleware/authorization.js';
import { endpoint } from './user.endpoint.js';
import * as validators from "./user.validation.js"
import { validateSchema } from '../../middleware/validate.js';
import { uploadFile } from '../../utils/upload/upload.files.js';
const router = Router();

router.get("/profile",
           authentication,
           authorization(endpoint.profile),
           userService.profile)


router.patch("/update-profile",
           validateSchema(validators.updateProvileValidation),
           authentication,
           authorization(endpoint.profile),
           userService.updateProfile)


router.patch("/update-password",
           validateSchema(validators.updatePassword),
           authentication,
           authorization(endpoint.profile),
           userService.updatePassword)

router.delete("/freeze-profile",
      
           authentication,
           authorization(endpoint.profile),
           userService.freezProfile)



router.get("/get-user-profile/:userId",
      
         
        //    authorization(endpoint.profile),
           userService.getUserProfile)

router.post("/upload-profile-pic",
    authentication,
    authorization(endpoint.profile),
    uploadFile().single("image"),
    userService.uploadProfilePic)

export default router;