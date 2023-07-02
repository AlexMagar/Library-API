import express from 'express'
import { addBook, getBooks } from '../modles/book/BookModel.js';

const router = express.Router();

router.post("/", async (req, res) =>{
    try {
        console.log(req.body);
        const result = await addBook(req.body);

        result?._id 
        ? res.json({
            status: 'success',
            message: "New book has been added"
        })
        : res.json({
            status: "error",
            message: "Error, unable to add the book, try again"
        })
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        })
    }
})


router.get("/", async (req, res) =>{
    try {
        const books = await getBooks();
        res.json({
            status: "success",
            message: "Book list",
            books,
        })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
        })
    }
})
export default router;