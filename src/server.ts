import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import routes from './routes';

import './database';

const app = express();

app.use(bodyParser.json());

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('entreii');
});
