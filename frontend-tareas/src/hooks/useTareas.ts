import { useEffect, useState } from "react";
import { obtenerTareas, actualizarTarea, crearTarea, eliminarTarea } from "../api/tareasApi";
import type { Tarea } from "../types/Tarea";
/**
 * Hook personalizado: useTareas
 *
 * Responsabilidad:
 * Gestionar el estado de las tareas dentro del frontend.
 *
 * Este hook encapsula la lógica necesaria para:
 * - cargar tareas desde el backend
 * - mantener el estado local de las tareas
 * - alternar el estado de completado de una tarea
 * - manejar posibles errores de la API
 *
 * Flujo de datos:
 * Componentes UI → useTareas → tareasApi → Backend Express
 *
 * Ventajas de usar un hook personalizado:
 * - separa la lógica del estado de los componentes
 * - permite reutilizar la lógica en distintos componentes
 * - mantiene los componentes más limpios y enfocados en la UI
 */
export function useTareas() {

  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const data = await obtenerTareas();
        setTareas(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    cargarTareas();
  }, []);
/**
 * Alterna el estado de completado de una tarea.
 *
 * Este método invierte el valor actual de la propiedad "completada"
 * y envía la actualización al backend.
 *
 * Ejemplo:
 * false → true
 * true → false
 *
 * Luego de actualizar el servidor, se actualiza el estado local
 * para reflejar el cambio inmediatamente en la interfaz.
 *
 * @param tarea
 * La tarea que se desea alternar.
 */
  async function toggleTarea(tarea: Tarea) {
    try {
      const tareaActualizada = await actualizarTarea(tarea.id, {
        completada: !tarea.completada
      });

      setTareas(prev =>
        prev.map(t =>
          t.id === tarea.id ? tareaActualizada : t
        )
      );

    } catch (err: any) {
      setError(err.message);
    }
  }

    async function agregarTarea(titulo: string, descripcion?: string) {
    try {

      const nuevaTarea = await crearTarea(titulo, descripcion);

      setTareas(prev => [...prev, nuevaTarea]);

    } catch (err: any) {
      setError(err.message);
    }
  }

/* Borrar Tarea por id.
*  
*  Borra localmente tambien en el estado.
*/
    async function borrarTarea(id: number) {
    try {
      await eliminarTarea(id);

      setTareas(prev =>
        prev.filter(t => t.id !== id)
      );

    } catch (err: any) {
      setError(err.message);
    }
  }

  async function actualizarTareaLocal(id: number, data: Partial<Tarea>) {
    try {
      const tareaActualizada = await actualizarTarea(id, data);

      setTareas(prev =>
        prev.map(t =>
          t.id === id ? tareaActualizada : t
        )
      );

    } catch (err: any) {
      setError(err.message);
    }
  }

  return { tareas, error, toggleTarea, agregarTarea, borrarTarea, actualizarTareaLocal};
}

