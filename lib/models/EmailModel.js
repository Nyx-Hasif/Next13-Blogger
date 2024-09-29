import mongoose from "mongoose";

//create schema

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    date: {
        type:Date,
        default:Date.now()
    },
});

// create model

const EmailModel = mongoose.models.email || mongoose.model("email", Schema); // model created
export default EmailModel;