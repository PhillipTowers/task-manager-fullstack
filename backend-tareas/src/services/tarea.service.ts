import { prisma } from '../prisma/client';
import { AppError } from "../errors/AppError";

// Obtener todas las tareas
export const obtenerTareas = async (userId: string) => {
  return prisma.tarea.findMany({
    where: { userId },
  });
};

// Obtener tarea por id
export const obtenerTareaPorId = async (id: string) => {
  return prisma.tarea.findUnique({
    where: { id },
  });
};

// Crear tarea con validación de título y máximo 10 tareas
export const crearTarea = async (
  titulo: string,
  descripcion: string | undefined,
  userId: string
  ) => {
  if (!titulo || titulo.trim() === "") {
    throw new AppError("El título es obligatorio", 400);
  }

  const total = await prisma.tarea.count({where: { userId }});
  if (total >= 10) {
    throw new AppError("No se pueden crear más de 10 tareas", 400);
  }

  return prisma.tarea.create({
    data: {
      titulo,
      descripcion,
      userId
    },
  });
};

// Actualizar tarea
export const actualizarTarea = async (
  id: string,
  data: {
    titulo?: string;
    descripcion?: string;
    completada?: boolean;
  }
) => {
  return prisma.tarea.update({
    where: { id },
    data,
  });
};

// Eliminar tarea
export const eliminarTarea = async (id: string) => {
  return prisma.tarea.delete({
    where: { id },
  });
};