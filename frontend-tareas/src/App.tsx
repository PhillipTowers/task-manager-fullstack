import { useTareas } from "./hooks/useTareas";
import { TareaForm } from "./components/TareaForm";
import { TareaList } from "./components/TareaList";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { FiltroTareas } from "./components/FiltroTareas";
import { useState } from "react";
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
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const {tareas, error, toggleTarea, agregarTarea, borrarTarea,actualizarTareaLocal, loading} = useTareas(isAuthenticated);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todas")

  if (!isAuthenticated) {
    return isRegistering
    ? (
        <RegisterForm
          onBackToLogin={() =>
            setIsRegistering(false)
          }
        />
      ) : (
        <LoginForm 
          onSwitchToRegister={() => setIsRegistering (true)} 
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      );
  }

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsRegistering(false);
    setIsAuthenticated(false);
  };

  
  const tareasFiltradas  = tareas.filter((tarea) =>
  tarea.titulo.toLowerCase().includes(busqueda.toLowerCase()));

  const totalTareas = tareas.length;

  const tareasCompletadas = tareas.filter(
    (tarea) => tarea.completada).length;

  const tareasPendientes = tareas.filter(
    (tarea) => !tarea.completada).length;

  let mostrarTareas = tareasFiltradas
  if (filtro === "completadas") {
    mostrarTareas = tareasFiltradas.filter((tarea)=> tarea.completada);
  } else if (filtro ==="pendientes") {
    mostrarTareas = tareasFiltradas.filter((tarea) => !tarea.completada);
  } 

  return (
  <div style={{width: "90%",maxWidth: "900px",margin: "40px auto",padding: "30px",fontFamily: "Arial, sans-serif",backgroundColor: "#1e1e1e",borderRadius: "12px",}}>

    <h1 style={{textAlign: "center", color: "red", marginBottom: "30px"}}>
      Task Manager
    </h1>

    <div style={{display: "flex",justifyContent: "center",marginBottom: "20px"}}>
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>

    {error && (
      <p
        style={{
          color: "red",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {error}
      </p>
    )}

    <div style={{ marginBottom: "30px" }}>
      <TareaForm onAgregar={agregarTarea} />
    </div>

    <div style={{ marginBottom: "30px" }}>
      <FiltroTareas
        busqueda={busqueda}
        onBuscar={setBusqueda}
        filtro={filtro}
        setFiltro={setFiltro}
        totalTareas={totalTareas}
        tareasCompletadas={tareasCompletadas}
        tareasPendientes={tareasPendientes}
      />
    </div>
      {loading ? (
        <p style={{ textAlign: "center" }}>
          Cargando tareas...
        </p>
      ) : (
        <TareaList
          tareas={mostrarTareas}
          onToggle={toggleTarea}
          onDelete={borrarTarea}
          onUpdate={actualizarTareaLocal}
        />
      )}
    </div>
  );
}

export default App;