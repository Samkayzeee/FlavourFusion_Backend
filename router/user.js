import { Router } from "express";
import User from "../models/User.js";
import bodyParser from "body-parser";
import pkg from 'jsonwebtoken';
import handles from "../controllers/authController.js";

const { sign } = pkg;


const urlencodedparser = bodyParser.urlencoded({ extended: true });


const router = Router();

router.post('/signup', urlencodedparser,  async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        if (( !firstname || !lastname || !email || !password )) {
            res.status(400).send({error: "All datas are needed to signup"});
            return;
        }
        const user =  await User.create({
            firstname,
            lastname,
            email,
            password
        });

        res.status(200).send({ message: "Signup Successful", user });
    } catch (error) {
        handles.handleErrors(error);
        res.status(400).send({ message:"User not created" });
    }

});



router.post('/login', urlencodedparser,  async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        res.status(200).send({message: "Login Successful", user}); 
    } catch (error) {
        if(!(email) || !(password)){
            res.status(401).send({ message: "Both Email and Password are required correctly" });
        }
        else{
            res.status(401).send({message: "User Not Found"});
        }
        console.log(error);
    }
});

export default router;