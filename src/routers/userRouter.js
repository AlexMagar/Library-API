import express from 'express'
import {getUserByEmail, insertUser} from '../modles/user/UserModel.js';
import { comparePassword, hashPassword } from '../utils/bcrypt.js';

const router = express.Router();

router.get("/", (req, res) =>{
    try {
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

        const user = await insertUser(req.body);
        console.log(user)
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


//this POST if for login
router.post("/login", async (req, res) =>{
    try {

        //get the data
        const {email, password} = req.body;
        
        //check if user exit with received email and get user from db
        const user = await getUserByEmail(email);

        //use bcrypt to check if the pw is matching
        console.log(user)

        
        if(user?._id){ //check null or not -> make sure aleast one user is in db
            const isMatch = comparePassword(password, user.password); //this one from bcrypt.js
            if(isMatch){
                user.password = undefined; //ways to aviod pw undefined
                // const {password, ...rest} = user;
                return res.json({
                    status: 'success',
                    message: 'logedin successfully',
                    user,
                })
            }
        }
        res.json({
            status: 'error',
            message: 'Invalid credentials',
        })
        
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
        })
    }
})

export default router;