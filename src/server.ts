import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';

const app = express();

app.listen('4000');

app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
