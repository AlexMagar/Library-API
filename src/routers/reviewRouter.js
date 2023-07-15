import express from 'express'
import {auth} from "../middleware/authMiddleware"
import {addReview, getReviews} from "../modles/review/ReviewModel"

const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        const result = await addReview(req.body)
        
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const reviews = await getReviews();
        res.json({
            status: "success",
            message: "here are the list",
            reviews,
        })
        
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        })
    }
})



export default router;