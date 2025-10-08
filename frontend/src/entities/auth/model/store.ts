import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, LoginData, RegisterData, User } from "../types";
import * as authApi from "../api/authApi";

interface AuthStore extends AuthState {
  login: (
    data: LoginData,
    onSuccess?: () => void,
    onError?: (message: string) => void
  ) => Promise<void>;
  register: (
    data: RegisterData,
    onSuccess?: () => void,
    onError?: (message: string) => void
  ) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (data: LoginData, onSuccess, onError) => {
        set({ isLoading: true });
        try {
          const response = await authApi.loginUser(data);

          localStorage.setItem("authToken", response.token);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });

          onSuccess?.();
        } catch (error) {
          set({ isLoading: false });
          const errorMessage =
            error instanceof Error ? error.message : "Login failed";
          onError?.(errorMessage);
        }
      },

      register: async (data: RegisterData, onSuccess, onError) => {
        set({ isLoading: true });
        try {
          await authApi.registerUser(data);

          // After successful registration, automatically login
          const loginResponse = await authApi.loginUser({
            email: data.email,
            password: data.password,
          });

          localStorage.setItem("authToken", loginResponse.token);
          set({
            user: loginResponse.user,
            token: loginResponse.token,
            isAuthenticated: true,
            isLoading: false,
          });

          onSuccess?.();
        } catch (error) {
          set({ isLoading: false });
          const errorMessage =
            error instanceof Error ? error.message : "Registration failed";
          onError?.(errorMessage);
        }
      },

      logout: () => {
        localStorage.removeItem("authToken");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        // Redirect will be handled by router
        window.location.href = "/welcome";
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setUser: (user: User) => {
        set({ user });
      },

      setToken: (token: string) => {
        set({ token, isAuthenticated: true });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
