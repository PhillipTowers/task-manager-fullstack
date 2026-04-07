import { z } from 'zod';

/**
 * Datos para crear una tarea
 */
export const crearTareaSchema = z.object({
  titulo: z
    .string()
    .min(1, 'El título no puede estar vacío'),

  descripcion: z
    .string()
    .optional(),
});
/**
 * Datos para actualizar una tarea
 */
export const actualizarTareaSchema = z.object({
  titulo: z
    .string()
    .min(1, 'El título no puede estar vacío')
    .optional(),

  descripcion: z
    .string()
    .optional(),

  completada: z
    .boolean()
    .optional(),
});

//Parámetros de ruta (GET / PUT / DELETE por id)
export const idParamSchema = z.object({
  id: z.coerce.number({
    message: 'El id debe ser un número válido',
  })
  .int({ message: 'El id debe ser un número entero' })
  .positive({ message: 'El id debe ser un número positivo' }),
});
