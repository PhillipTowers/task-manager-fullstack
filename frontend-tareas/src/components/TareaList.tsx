/**
 * Componente: TareaList
 *
 * Responsabilidad:
 * Renderizar una lista de tareas en la interfaz.
 *
 * Este componente recibe un arreglo de tareas
 * y delega el render de cada una al componente TareaItem.
 *
 * Mantiene el principio de separación de responsabilidades:
 * - TareaList maneja la lista
 * - TareaItem maneja cada tarea individual
 */
import type { Tarea } from "../types/Tarea";
import { TareaItem } from "./TareaItem";

interface Props {
  tareas: Tarea[];
  onToggle: (tarea: Tarea) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<Tarea>) => void;
}

export function TareaList({ tareas, onToggle, onDelete, onUpdate }: Props) {
  return (
    <ul>
      {tareas.map((tarea) => (
        <TareaItem
          key={tarea.id}
          tarea={tarea}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}