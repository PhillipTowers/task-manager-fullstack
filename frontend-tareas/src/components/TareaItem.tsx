import { useState } from "react";
import type { Tarea } from "../types/Tarea";

interface Props {
  tarea: Tarea;
  onToggle: (tarea: Tarea) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Partial<Tarea>) => void;
}

export function TareaItem({ tarea, onToggle, onDelete, onUpdate }: Props) {

  const [editando, setEditando] = useState(false);
  const [nuevaDescripcion, setNuevaDescripcion] = useState(tarea.descripcion || "");

  async function guardarCambios() {
    await onUpdate(tarea.id, {
      descripcion: nuevaDescripcion
    });

    setEditando(false);
  }

  return (
    <li style={{
      border: "1px solid #333",
      padding: "12px",
      borderRadius: "6px",
      marginBottom: "10px",
      backgroundColor: "#2a2a2a"
    }}>

      {/* TÍTULO + CHECK */}
      <div style={{ marginBottom: "8px" }}>
        <input
          type="checkbox"
          checked={tarea.completada}
          onChange={() => onToggle(tarea)}
        />

        <span style={{
          marginLeft: "8px",
          textDecoration: tarea.completada ? "line-through" : "none"
        }}>
          {tarea.titulo}
        </span>
      </div>

      {/* DESCRIPCIÓN / EDICIÓN */}
      {editando ? (
        <div style={{ marginBottom: "8px" }}>
          <input
            value={nuevaDescripcion}
            onChange={(e) => setNuevaDescripcion(e.target.value)}
          />

          <div style={{ marginTop: "6px" }}>
            <button onClick={guardarCambios}>
              Guardar
            </button>

            <button onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        tarea.descripcion && (
          <p style={{ marginBottom: "8px", color: "#ccc" }}>
            {tarea.descripcion}
          </p>
        )
      )}

      {/* BOTONES */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setEditando(true)}>
          Editar
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();

            const confirmar = window.confirm("¿Eliminar tarea?");
            if (!confirmar) return;

            onDelete(tarea.id);
          }}
        >
          Eliminar
        </button>
      </div>

    </li>
  );
}