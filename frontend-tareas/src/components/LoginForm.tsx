import { useState } from "react";
import { login } from "../api/auth.api";


interface LoginFormProps{
  onSwitchToRegister: () => void;
}

export const LoginForm = ({onSwitchToRegister}: LoginFormProps) => {
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

      setSuccess("Login exitoso");
      setLoading(false);

    } catch (error) {

      console.error(error);
      setError("Credenciales inválidas");
      setLoading(false);

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit" disabled={loading}>
        {loading
          ? "Ingresando..."
          : "Iniciar sesión"}
      </button>

      <button onClick={onSwitchToRegister}>
        Registrarse
      </button>
      
    </form>
  );
};