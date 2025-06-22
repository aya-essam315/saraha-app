
import { EventEmitter } from "events";
import { generateToken } from "../security/token/token.js";
import { sendEmail } from "./sendemail.js";

export const emailEvent = new EventEmitter();

emailEvent.on("sendConfirmEmail", async({email})=>{
    
    const emailToken = generateToken({payload:{email}, secreteKey:process.env.EMAIL_JWT_SECRET, options:{expiresIn:60*60}})

   const link = `http://localhost:3000/auth/activate-account/${emailToken}`
    await sendEmail({to:email, subject:"confirmation email", html:`<a href=${link}>click me</a>`})
})