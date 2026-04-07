import { NextFunction, Request, Response } from 'express';
import { obtenerTareas, crearTarea, obtenerTareaPorId, actualizarTarea, eliminarTarea } from '../services/tarea.service';
import { actualizarTareaSchema, idParamSchema } from '../schemas/schema.tarea';
import { AppError } from '../errors/AppError';

//  Obtener todas las tareas
export const getTareas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tareas = await obtenerTareas();
    res.json(tareas);
  } catch (error) {
    next(error);
  }
};


//  Obtener tarea por ID
export const getTareaPorId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = idParamSchema.parse(req.params);

    const tarea = await obtenerTareaPorId(id);

    if (!tarea) {
      throw new AppError("Tarea no encontrada", 404);
    }

    res.json(tarea);
  } catch (error) {
    next(error);
  }
};


//  Crear tarea
export const postTarea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titulo, descripcion } = req.body;
    const tarea = await crearTarea(titulo, descripcion);
    res.status(201).json(tarea);
  } catch (error) {
    next(error);
  }
};


//  Actualizar tarea
export const updateTarea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const data = actualizarTareaSchema.parse(req.body);

    const tareaExistente = await obtenerTareaPorId(id);

    if (!tareaExistente) {
      throw new AppError("Tarea no encontrada", 404);
    }

    const tareaActualizada = await actualizarTarea(id, data);

    res.json(tareaActualizada);
  } catch (error) {
    next(error)
  }
};


//  Eliminar tarea
export const deleteTarea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = idParamSchema.parse(req.params);

    const tareaExistente = await obtenerTareaPorId(id);

    if (!tareaExistente) {
      throw new AppError("Tarea no encontrada", 404);
    }

    await eliminarTarea(id);

    return res.status(204).send();
  } catch (error) {
    next(error)
  }
};
