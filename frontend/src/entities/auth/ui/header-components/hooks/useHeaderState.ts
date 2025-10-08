import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../../model/store";

export const useHeaderState = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  // Determine if we should show navigation (for authenticated users on protected pages)
  const isWelcomePage = location.pathname === "/welcome";
  const showNavigation = isAuthenticated && !isWelcomePage;

  return {
    isAuthenticated,
    isWelcomePage,
    showNavigation,
  };
};
