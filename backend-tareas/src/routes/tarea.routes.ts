/**
 * Router de tareas.
 * 
 * Este archivo define las rutas relacionadas
 * con la entidad "Tarea".
 * 
 * NOTA:
 * Este router está montado con el prefijo "/tareas"
 * en app.ts, por lo tanto aquí solo se definen rutas relativas.
 */
import { Router } from 'express';
import { getTareas, getTareaPorId, postTarea, updateTarea, deleteTarea } from '../controllers/tarea.controller';
import { crearTareaSchema, actualizarTareaSchema,idParamSchema} from '../schemas/schema.tarea';
import { validate } from '../middlewares/validateSchema';

const router = Router();
/**
 * GET /
 * Obtiene todas las tareas.
 * Ruta final: GET /tareas
 */
// Obtener todas las tareas
router.get('/', getTareas);
/**
 * GET /:id
 * Obtiene una tarea específica por su ID.
 * Se valida el parámetro antes de ejecutar el controlador.
 * Ruta final: GET /tareas/:id
 */
// Obtener tarea por id
router.get(
  '/:id',
  validate(idParamSchema, 'params'),
  getTareaPorId
);
/**
 * POST /
 * Crea una nueva tarea.
 * Se valida el body antes de ejecutar el controlador.
 * Ruta final: POST /tareas
 */
// Crear tarea
router.post(
  '/',
  validate(crearTareaSchema, 'body'),
  postTarea
);
/**
 * PUT /:id
 * Actualiza una tarea existente.
 * Se valida tanto el parámetro como el body.
 * Ruta final: PUT /tareas/:id
 */
// Actualizar tarea
router.put(
  '/:id',
  validate(idParamSchema, 'params'),
  validate(actualizarTareaSchema, 'body'),
  updateTarea
);
/**
 * DELETE /:id
 * Elimina una tarea por su ID.
 * Ruta final: DELETE /tareas/:id
 */
// Eliminar tarea
router.delete(
  '/:id',
  validate(idParamSchema, 'params'),
  deleteTarea
);

export default router;