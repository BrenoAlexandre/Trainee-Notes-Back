import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import './Config/database';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

const port = 3333;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}! 🎉`);
});
