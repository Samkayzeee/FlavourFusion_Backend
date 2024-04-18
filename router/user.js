import { Router } from "express";
import User from "../models/User.js";
import bodyParser from "body-parser";


const urlencodedparser = bodyParser.urlencoded({ extended: true });


const router = Router();

router.post('/signup', urlencodedparser,  async (req, res) => {
    const body = req.body;

    try {
        if (!(body)) {
            return res.status(400).send({error: "Data are needed"})
        }

        const user = await User.create({
            firstname:body.firstname,
            lastname: body.lastname,
            email:body.email,
            password:body.password
        });

        res.status(200).send({message: "Signup Successful", user});
    } catch (error) {
        res.status(400).send({message:"User not created"});
        console.log(error);
    }

});

export default router;