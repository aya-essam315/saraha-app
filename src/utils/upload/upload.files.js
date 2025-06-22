import multer, { diskStorage } from "multer";
import {v4 as uuidv4} from "uuid";

export const uploadFile = () =>{
    const storage = diskStorage({destination:"uploads", filename: (req,file,cb)=>{
        cb(null, uuidv4() + file.originalname);
    }})
    return multer({storage})
}