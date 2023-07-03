import BookSchema from "./BookSchema.js";

export const addBook = (bookObj) => {
  return BookSchema(bookObj).save();
};

export const getBooks = () => {
    return BookSchema.find();
  };

  export const updateBooks = (_id, data) => {
    return BookSchema.findByIdAndUpdate(_id, data);
  }

  export const deleteBooks = (_id) =>{
    return BookSchema.findByIdAndDelete(_id);
  }
  