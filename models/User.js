import { Schema, model } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";
import  pkg from 'validator';


const { isEmail } = pkg;
 


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
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: Schema.Types.String,
        required: [true, "Please input password"]
    }
},

{
    timestamps: true
});



userSchema.pre('save', async function(next){
    const salt = await genSalt();
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
    next();
});



userSchema.statics.login = async function (email, password){
    const user = await this.findOne({email});
    
    if (user) {
        const auth = await compare(password, user.password);

        if (auth) {
            return user;
        }

        throw Error("Incorrect Password");
    }

    throw Error("Email not found");
}

const User = model("users", userSchema);


export default User;