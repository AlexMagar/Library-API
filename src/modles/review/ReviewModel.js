import reviewSchema from "./ReviewSchema.js";

export const addBurrow = (obj) => {
  return reviewSchema(obj).save();
};

// all burrow transaction for admin user only
export const getBurrows = () => {
    return reviewSchema.find();
  };
\

  //all burrow transaction for individual user of theit own
  export const getBurrowbyUserId = (userId) => {
    return reviewSchema.find({userId});
  }

  export const updateBurrows = (_id, data) =>{
    return reviewSchema.findByIdAndUpdate(_id, data);
  };

  export const deleteBurrow = (_id) =>{
    return reviewSchema.findByIdAndDelete(_id);
  }
  