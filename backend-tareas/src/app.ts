/**
 * Archivo principal de configuración del servidor.
 * 
 * Aquí se:
 * - Inicializa Express
 * - Configuran middlewares globales
 * - Montan los routers con sus respectivos prefijos
 */
import express from 'express';
import tareaRoutes from './routes/tarea.routes';
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";


const app = express();
/**
 * Middleware global para permitir recibir JSON en las requests.
 * Sin esto, req.body sería undefined.
 */
app.use(express.json());
/**
 * Prefijo principal para las rutas de tareas.
 * 
 * IMPORTANTE:
 * Todas las rutas definidas dentro de tareaRoutes
 * serán precedidas por "/tareas".
 * 
 * Ejemplo:
 * router.get('/')  -> GET /tareas
 * router.get('/:id') -> GET /tareas/:id
 */
app.use(cors());
app.use('/tareas', tareaRoutes);
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// siempre al final el error handler
app.use(errorHandler);

export default app;
