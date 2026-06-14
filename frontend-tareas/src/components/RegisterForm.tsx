import { useState } from "react";
import { register } from "../api/auth.api";

interface RegisterFormProps {
  onBackToLogin: () => void;
}

export function RegisterForm({ onBackToLogin }: RegisterFormProps) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setLoading(true);

    try {

    const data = await register(email, password)
    
    setError("");
    setSuccess("Usuario registrado correctamente");
    setLoading(false);

    setTimeout(() => {
      onBackToLogin();
    }, 2000);

    console.log(data);

    } catch (error) {

      console.error(error);
      setLoading(false);
      setError("Error de conexión");
      setSuccess("");
    }
  }

    return (
      <form onSubmit={handleSubmit} style={{width: "300px", margin: "80px auto",padding: 20, border: "1px solid gray", borderRadius: "8px",textAlign: "center"}}>

        <h2>Registro</h2>

       <div>
          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: "green" }}>
              {success}
            </p>
          )}
        </div> 

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input style={{ marginTop: "10px" }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button type="submit" disabled={loading} style={{ marginTop: "20px" }}>
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </div>

          <div>
            <button onClick={onBackToLogin} style={{ marginTop: "10px" }}>
              Volver a login
            </button>
          </div>

      </form> 
  );
}