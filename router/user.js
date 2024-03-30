import { Router } from "express";


const router = Router();

router.get('/signup', (req, res) => {
    res.send("Signup router ready");
});

export default router;