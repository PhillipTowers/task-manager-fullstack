import express from 'express';
import dotenv from "dotenv";
import tareaRoutes from './routes/tarea.routes';
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*"
}));

app.use('/tareas', tareaRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.use(errorHandler);

export default app;
