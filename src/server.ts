import express from 'express';
import cors from 'cors';

const app = express();

app.listen('4000');
app.use(express.json());
app.use(cors());


