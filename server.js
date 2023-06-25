import dotenv from 'dotenv'
import express from 'express'

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

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