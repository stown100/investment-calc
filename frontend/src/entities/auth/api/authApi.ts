import { LoginData, RegisterData, AuthResponse } from "../types";

const API_BASE_URL = "http://localhost:3001/api";

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

export const registerUser = async (
  data: RegisterData
): Promise<{ message: string; user: { id: string; email: string } }> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};

export const getCurrentUser = async (): Promise<{ id: string; email: string }> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    let errorMessage = "Failed to fetch current user";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {}
    const error: any = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  return response.json();
};
