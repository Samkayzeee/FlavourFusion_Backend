import { log } from 'console';
import express, { json } from 'express';
import userRoute from "./router/user.js";

const app = express();

app.use(json());


const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Server is now running");
});

app.use('/', userRoute);



app.listen(PORT, () => console.log(`app running on port ${PORT}`));