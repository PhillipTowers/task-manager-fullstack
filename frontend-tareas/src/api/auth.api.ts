const API_URL = "https://task-manager-fullstack-vawf.onrender.com/auth";  //"http://localhost:3000/auth";

export const register = async (
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al registrar usuario");
  }

  return response.json();
};

export const login = async (
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  return response.json();
};