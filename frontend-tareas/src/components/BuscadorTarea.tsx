
interface Props{
    onBuscar: (value: string) => void;
    busqueda: string;
}

export function BuscadorTarea({onBuscar, busqueda}: Props){
    
    return(
        <div style={{ marginBottom: "20px" }}>
            
            <input type="text"
            name="buscador"
            value={busqueda}
            onChange={(e) => onBuscar(e.target.value)}
            placeholder="Buscar por titulo" />

        </div>
    );
} 