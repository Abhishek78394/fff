
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");


const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: [4, "name must have atleast 4 characters"],
            required: [true, "name is required"],
        },
        email: {
            type: String,
            require: [true, "email is required"],
            validate: [validator.isEmail, "email is invalid"],
        },
        password: {
            type: String,
            minLength: [6, "name must have atleast 4 characters"],
            required: [true, "name field must not empty"],
        
        },
        type: {
            type: String,
            default: "user"
        
        }
       
    },
    { timestamps: true }
);





const user = mongoose.model("user", userModel);

module.exports = user;