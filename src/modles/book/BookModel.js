import BookSchema from "./BookSchema.js";

export const addBook = (bookObj) => {
  return BookSchema(bookObj).save();
};

export const getBooks = () => {
    return BookSchema.find();
  };

  export const updateBooks = (obj) => {
    return BookSchema.updateOne();
  }
  