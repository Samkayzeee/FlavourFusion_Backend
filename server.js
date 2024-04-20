import { log, error } from 'console';
import express, { json } from 'express';
import userRoute from "./router/user.js";
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const app = express();

app.use(json());


const PORT = process.env.PORT || 3000;
const MONGOURI = process.env.MONGOURI;


app.listen(PORT, () => console.log(`app running on port ${PORT}`));


mongoose.connect(MONGOURI);

mongoose.connection.on('connected', () => {
    log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
    error('Error connecting to MongoDB:', error);
});
  
  mongoose.connection.on('disconnected', () => {
    log('Disconnected from MongoDB');
});


app.use('/', userRoute);