import express, { json } from 'express';

const app = express();

app.use(json());


const PORT = 3000;

app.get('/', (req, res) => {
    res.send("working");
});

app.listen(PORT, () => console.log(`app running on port ${PORT}`));