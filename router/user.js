import { Router } from "express";
import User from "../models/User.js";


const router = Router();

router.get('/signup', (req, res) => {
    res.send("Signup router ready");
});

export default router;