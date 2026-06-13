import { useState } from "react";
import { login } from "../api/auth.api";


interface LoginFormProps{
  onSwitchToRegister: () => void;
  onLoginSuccess:() => void;
}

export const LoginForm = ({onSwitchToRegister,onLoginSuccess}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await login(email, password);

      console.log(data);

      localStorage.setItem("token", data.token);

      setTimeout(() => {
        onLoginSuccess();
      }, 100);
      setSuccess("Login exitoso");
      
      
    } catch (error) {

      console.error(error);
      setError("Credenciales inválidas");
      

    }
    finally{
       setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>Login</h2>

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

      <div >
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />
      </div>   

      <div>
        <input style={{ marginTop: "10px" }}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        />
      </div>

      <div>
        <button type="submit" disabled={loading} style={{ marginTop: "20px" }}>
          {loading
            ? "Ingresando..."
            : "Iniciar sesión"}
        </button>
      </div>

      <div>
        <button onClick={onSwitchToRegister} style={{ marginTop: "10px" }}>
          Registrarse
        </button>
      </div>
      
    </form>
  );
};