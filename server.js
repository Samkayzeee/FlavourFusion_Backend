import { log } from 'console';
import express, { json } from 'express';
import userRoute from "./router/user.js";
import { connect } from 'mongoose';
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();

const app = express();

app.use(json());


const PORT = 3000;
const MONGOURI = process.env.MONGOURI;
const client = new MongoClient(MONGOURI);


app.listen(PORT, () => console.log(`app running on port ${PORT}`));

const connectMongoDB = async() => {
    try {
        await client.connect();
        log("Database Connected Successfully");


    } catch (error) {
        log("Error Connecting to the Database: ", error);
    }
}

connectMongoDB();





app.use('/', userRoute);