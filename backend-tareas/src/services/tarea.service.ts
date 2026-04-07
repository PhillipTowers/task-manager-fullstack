import { prisma } from '../prisma/client';
import { AppError } from "../errors/AppError";

// Obtener todas las tareas
export const obtenerTareas = async () => {
  return prisma.tarea.findMany();
};

// Obtener tarea por id
export const obtenerTareaPorId = async (id: number) => {
  return prisma.tarea.findUnique({
    where: { id },
  });
};

// Crear tarea con validación de título y máximo 10 tareas
export const crearTarea = async (
  titulo: string,
  descripcion?: string
) => {
  // Validación de título
  if (!titulo || titulo.trim() === "") {
    throw new AppError("El título es obligatorio", 400);
  }

  // Contar tareas existentes
  const total = await prisma.tarea.count();
  if (total >= 10) {
    throw new AppError("No se pueden crear más de 10 tareas", 400);
  }

  // Crear tarea
  return prisma.tarea.create({
    data: {
      titulo,
      descripcion,
    },
  });
};

// Actualizar tarea
export const actualizarTarea = async (
  id: number,
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
export const eliminarTarea = async (id: number) => {
  return prisma.tarea.delete({
    where: { id },
  });
};
