import { BuscadorTarea } from "./BuscadorTarea";

interface FiltroTareasProps {
  busqueda: string;
  onBuscar: (valor: string) => void;
  filtro: string;
  setFiltro: (valor: string) => void;
  totalTareas: number;
  tareasCompletadas: number;
  tareasPendientes: number;
}


export function FiltroTareas({busqueda, onBuscar, filtro, setFiltro, totalTareas, tareasCompletadas, tareasPendientes}: FiltroTareasProps) {
  return (
    <div>
        <div style={{ marginBottom: "20px" }}>
          <BuscadorTarea
            busqueda={busqueda}
            onBuscar={onBuscar}
          />
        </div>

        <div style={{display: "flex",justifyContent: "center",gap: "10px"}}>

            <button onClick={() => setFiltro("completadas")}  style={{fontWeight:filtro === "completadas"
              ? "bold" : "normal", backgroundColor: filtro === "completadas" ? "green" : "transparent"}}>
              completadas
            </button>

            <button onClick={() => setFiltro("pendientes")} style={{fontWeight:filtro === "pendientes"
              ? "bold": "normal", backgroundColor: filtro === "pendientes" ? "red" : "transparent"}}>
              pendientes
            </button>

            <button onClick={() => setFiltro("todas")} style={{fontWeight:filtro === "todas"
              ? "bold": "normal", backgroundColor: filtro === "todas" ? "blue" : "transparent" }}>
              todas
            </button>
            
        </div>

        <p style={{marginTop: "20px", marginBottom: "20px",fontWeight: "bold",textAlign: "center"}}>
          Total: {totalTareas} | Completadas: {tareasCompletadas} | Pendientes: {tareasPendientes}
        </p>

    </div>
  );
}