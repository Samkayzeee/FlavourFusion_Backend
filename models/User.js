import { Schema, model } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";


const userSchema = new Schema({
    firstname: {
        type: Schema.Types.String,
        required: [true, "Please input your Firstname"]
    },
    lastname: {
        type: Schema.Types.String,
        required: [true, "Please input your Lastname"]
    },
    email: {
        type: Schema.Types.String,
        required: [true, "Please input your email"],
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: [true, "Please input password"]
    }
},

{
    timestamps: true
});

const User = model("users", userSchema);


export default User;