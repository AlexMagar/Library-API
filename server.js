import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan';
import userRouter from './src/routers/userRouter.js';
import connectMongoDB from './src/config/mongoConfig.js'
import cors  from "cors";

const PORT = process.env.PORT || 8000;
const app = express();
dotenv.config();

//connect db
connectMongoDB();

//middleware
app.use(morgan("dev")); //morgan saves the log 
app.use(express.json()) //to parse the json data
app.use(cors);


// apis
app.use("/api/v1/user", userRouter)

app.use("/", (req, res) =>{
    res.json({
        status: "success",
        message: "server running well"
    })
})

app.listen(PORT, (err) =>{
    err
    ? console.log(err.message)
    : console.log(`server running at http://localhost:${PORT}`)
})