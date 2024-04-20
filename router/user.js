import { Router } from "express";
import User from "../models/User.js";
import bodyParser from "body-parser";
import pkg from 'jsonwebtoken';

const { sign } = pkg;


const urlencodedparser = bodyParser.urlencoded({ extended: true });


const router = Router();

router.post('/signup', urlencodedparser,  async (req, res) => {
    const body = req.body;

    try {
        if (!body) {
            res.status(400).send({error: "Data are needed"});
            return;
        }

        const user =  await User.create({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: body.password
        });

        res.status(200).send({message: "Signup Successful", user:user});
    } catch (error) { 
        res.status(500).send({message:"User not created"});
        console.log(error);
    }

});

export default router;