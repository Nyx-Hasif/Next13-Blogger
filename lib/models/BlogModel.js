import mongoose from "mongoose";

//create schema
//schema ini akan dipaparkan di dalam mongoDB untuk saved
const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorImg: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

//create model
//guna OR operator sebab xnak bagi dia infinite data tanpa ada stop
const BlogModel = mongoose.models.blog || mongoose.model("blog", Schema);
//export it
export default BlogModel;
