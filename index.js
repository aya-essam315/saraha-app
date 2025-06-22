import path from "path"

import * as dotenv from "dotenv"
dotenv.config({})
import express from 'express';
import bootStrap from './src/app.controller.js';
import connectDB from "./src/db/connection.db.js"
const app = express();
const port = process.env.PORT || 5000;

bootStrap(app, express);
await connectDB()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
