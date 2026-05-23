import { useState } from "react";

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
    const response = await fetch("http://localhost:3000/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

      if (!response.ok) {

      setLoading(false);
      setError(data.message || "Error registrando usuario");
      setSuccess("");

      return;
    }

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
      <div>
        <h2>Registro</h2>
        
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

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading
              ? "Registrando..."
              : "Registrarse"}
          </button>

        </form>

        <button onClick={onBackToLogin}>
          Volver a login
        </button>

      </div>
  );
}