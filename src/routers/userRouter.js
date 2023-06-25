import express from 'express'
import {insertUser} from '../modles/user/UserModel.js';
import { hashPassword } from '../utils/bcrypt.js';

const router = express.Router();

router.get("/", (req, res) =>{
    try {
        console.log(req.body)
        res.json({
            status: "success",
            message: "Here are the user information"
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message:"error message"
        })
    }
});

router.post("/", async (req, res) =>{
    try {
        
        const {password} = req.body;
        req.body.password = hashPassword(password);

        const user = await insertUser(req.body)

        user?._id //if user._id is true
        ? res.json({
            status:"Sucess",
            message: "New user has been created successfull"
        })
        :res.json({
            status: "error",
            message:"Unable to create user, try again later",
        })
    } catch (error) {
        console.log(error)
        let msg = error.message;

        if(msg.includes("E11000 duplicate key error")){
            msg ="here is another user who uses this email in the system"
        }

        res.json({
            status: "error",
            message: msg,
        })
    }
});
export default router;