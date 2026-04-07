import type { Tarea } from "../types/Tarea";
/**
 * Archivo: tareasApi.ts
 * Capa: API
 *
 * Responsabilidad:
 * Centralizar todas las peticiones HTTP relacionadas con la entidad "Tarea".
 *
 * Este archivo actúa como intermediario entre el frontend React
 * y el backend Express. Aquí se definen las funciones que realizan
 * las llamadas a la API REST del servidor.
 *
 * Flujo dentro de la aplicación:
 * UI (components) → Hook (useTareas) → API (tareasApi) → Backend (Express)
 *
 * Ventaja de esta capa:
 * - Mantener separada la lógica de red del resto de la aplicación.
 * - Facilitar mantenimiento si cambia la URL del backend o endpoints.
 */
const API_URL = "http://localhost:3000/tareas";
/**
 * Obtiene todas las tareas almacenadas en el backend.
 *
 * Endpoint utilizado:
 * GET /tareas
 *
 * @returns Promise<Tarea[]>
 * Devuelve un arreglo de tareas provenientes del servidor.
 *
 * @throws Error
 * Si la petición HTTP falla o el servidor responde con error.
 */
export async function obtenerTareas(): Promise<Tarea[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error al obtener tareas");
  }

  return res.json();
}

export async function crearTarea(
  titulo: string,
  descripcion?: string
): Promise<Tarea> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, descripcion }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al crear tarea");
  }

  return res.json();
}
/**
 * Actualiza parcialmente una tarea existente en el servidor.
 *
 * Endpoint utilizado:
 * PUT /tareas/:id
 *
 * Se utiliza principalmente para alternar el estado "completada"
 * de una tarea desde la interfaz del usuario.
 *
 * @param id
 * ID de la tarea a actualizar.
 *
 * @param tarea
 * Objeto parcial con los campos a modificar.
 *
 * @returns Promise<Tarea>
 * Devuelve la tarea actualizada desde el backend.
 *
 * @throws Error
 * Si la petición HTTP falla.
 */
export async function actualizarTarea(
  id: number,
  tarea: Partial<Tarea>
): Promise<Tarea> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarea),
  });

  if (!res.ok) {
    throw new Error("Error actualizando tarea");
  }

  return res.json();
}

export async function eliminarTarea(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error eliminando tarea");
  }
}