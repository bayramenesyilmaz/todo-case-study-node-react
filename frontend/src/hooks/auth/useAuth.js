import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login, logout } from "../../store/slices/authSlice";
import { authService } from "../../services/authService";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      const { user, token } = response?.data?.data; // Gelen veriyi çözümle
      // Token ve kullanıcı bilgilerini slice'a gönder
      dispatch(login({ user, token }));

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(credentials);
      const { user, token } = response?.data?.data; // Gelen veriyi çözümle

      // Token ve kullanıcı bilgilerini slice'a gönder
      dispatch(login({ user, token }));
      navigate("/");
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
    register: handleRegister,
    logout: handleLogout,
    loading,
    error,
  };
};
