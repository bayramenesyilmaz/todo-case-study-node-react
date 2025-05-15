// filepath: e:\projeler\ttnet-case\todo-case-study-node-react\frontend\src\hooks\useAuth.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login, logout } from "../../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        credentials.email === "test@test.com" &&
        credentials.password === "123456"
      ) {
        const user = {
          id: 1,
          name: "Test User",
          email: credentials.email,
          role: "user",
        };

        dispatch(login(user));
        navigate("/");
      } else {
        throw new Error("Email veya şifre hatalı!");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    loading,
    error,
  };
};
