
interface Props{
    onBuscar: (value: string) => void;
    busqueda: string;
}

export function BuscadorTarea({onBuscar, busqueda}: Props){
    
    return(
        <div style={{ marginBottom: "20px", display: "flex",justifyContent: "center"}}>
            
            <input type="text"
            name="buscador"
            value={busqueda}
            onChange={(e) => onBuscar(e.target.value)}
            placeholder="Buscar por titulo" style={{width: "250px"}}
            />

        </div>
    );
} 