import express from 'express'
import { addBook, deleteBooks, getBooks, updateBooks } from '../modles/book/BookModel.js';
import { adminAuth, auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/",auth, adminAuth, async (req, res) =>{
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

router.put("/", auth, adminAuth, async (req, res) =>{
    try {

        const { __v, _id, ...rest} = req.body;

        const result = await updateBooks(_id, rest);

        result?._id 
        ? res.json({
            status: "success",
            message: "Book has been updated successfully",
        })
        : res.json({
            status: "error",
            message: "Error, unable to update the book, try again",
        })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
        })
    }
})

router.delete("/:_id", auth, adminAuth, async (req, res) =>{
    try {
        const {_id} = req.params;
        const books = await deleteBooks(_id);

        books?._id 
        ? res.json({
            status: "success",
            message: "Book has been deleted successfully",
        })
        : res.json({
            status: "error",
            message: "Error, unable to delete the book, try again",
        })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
        })
    }
})
export default router;