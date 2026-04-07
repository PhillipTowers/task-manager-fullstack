import { useState } from "react";

interface Props {
  onAgregar: (titulo: string, descripcion?: string) => void;
}

export function TareaForm({ onAgregar }: Props) {

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!titulo.trim()) return;

    onAgregar(titulo, descripcion);

    setTitulo("");
    setDescripcion("");
  }

  return (
    <form onSubmit={handleSubmit}>

      <input style={{padding: "6px",marginRight: "6px",borderRadius: "4px",border: "1px solid #555"}}
        type="text"
        placeholder="Título de la tarea"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input style={{padding: "6px",marginRight: "6px",borderRadius: "4px",border: "1px solid #555"}}
        type="text"
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <button type="submit">
        Crear tarea
      </button>

    </form>
  );
}