import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import morgan from 'morgan';
import userRouter from './src/routers/userRouter.js';
import connectMongoDB from './src/config/mongoConfig.js'
import cors  from "cors";
import bookRouter from "./src/routers/bookRouter.js";
import burrowRouter from "./src/routers/burrowRouter.js";
import { auth } from './src/middleware/authMiddleware.js';
import reviewRouter from './src/routers/reviewRouter.js'


const PORT = process.env.PORT || 8000;
const app = express();


//connect db
connectMongoDB();

//middleware
app.use(morgan("dev")); //morgan saves the log 
app.use(express.json()) //to parse the json data
app.use(cors()); //cors() is the function 


// apis
app.use("/api/v1/user", userRouter)
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/burrow",auth, burrowRouter);
app.use("./app/v1/review", reviewRouter)

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