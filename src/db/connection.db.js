

import mongoose from "mongoose";


 const connectDB = async()=>{
    await mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("Connected to MongoDB")
    })
    .catch((err)=>{
        console.log('fail to connect db', err)
    })
}

export default connectDB;