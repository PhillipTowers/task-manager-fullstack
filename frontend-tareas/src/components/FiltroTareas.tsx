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
        <BuscadorTarea
              busqueda={busqueda}
              onBuscar={onBuscar}
          />

        <div>
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

        <p>Total: {totalTareas}</p>
        <p>Completadas: {tareasCompletadas}</p>
        <p>Pendientes: {tareasPendientes}</p>

    </div>
  );
}