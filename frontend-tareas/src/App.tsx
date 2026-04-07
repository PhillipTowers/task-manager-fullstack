import { useTareas } from "./hooks/useTareas";
import { TareaForm } from "./components/TareaForm";
import { TareaList } from "./components/TareaList";

/**
 * Componente raíz de la aplicación.
 *
 * Este componente coordina los principales elementos de la interfaz:
 * - formulario de creación de tareas
 * - listado de tareas
 *
 * Toda la lógica relacionada con tareas se encuentra
 * encapsulada dentro del hook `useTareas`.
 */

function App() {

  const { tareas, error, toggleTarea, agregarTarea, borrarTarea,actualizarTareaLocal } = useTareas();

  return (
    <div style={{width:"100%",margin: "40px auto",padding: "20px",fontFamily: "Arial, sans-serif",backgroundColor: "#1e1e1e", borderRadius: "8px"}}>

      <h1 style={{ textAlign: "center", color: "red" }}>Task Manager</h1>

      {error && <p style={{ color: "red" }}>
        {error}
      </p>}

      <div style={{ marginBottom:"20px" }}>
        <TareaForm onAgregar={agregarTarea} />
      </div>

      <TareaList
        tareas={tareas}
        onToggle={toggleTarea}
        onDelete={borrarTarea}
        onUpdate={actualizarTareaLocal}
      />

    </div>
  );
}

export default App;