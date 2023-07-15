import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    bookId:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    bookName:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    dueDate:{
        type: Date,
        required: true,
    },
    isReturned:{
        type: Boolean,
        default: false,
    },
    returnDate:{
        type:Date,
        required: null,
    },
},
{
    timestamps: true
}
);

export default mongoose.model("Review", reviewSchema) //mongodb will convert User into burrows

//Schema is the table