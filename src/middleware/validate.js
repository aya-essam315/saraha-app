
import joi from "joi"
// import { Schema } from "mongoose"
export const validateSchema = (schema)=>{
    return (req,res,next)=>{
        const data = {...req.body, ...req.params, ...req.query}
        
       
           const result = schema.validate(data, {abortEarly:false})
               

    if(result.error) {
        let messages = result.error.details.map((ele)=> ele.message )
        return next(new Error(messages, {cause:400}))
    }

    return next();
    }
    }
