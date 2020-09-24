import 'reflect-metadata';
import express from 'express';
import 'express-async-errors'; // usando para tratar os erros
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('entreii');
});
