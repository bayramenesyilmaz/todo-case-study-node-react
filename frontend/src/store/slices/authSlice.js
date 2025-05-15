import { createSlice } from "@reduxjs/toolkit";

const loadAuthState = () => {
  try {
    const authState = localStorage.getItem("authState");
    return authState ? JSON.parse(authState) : null;
  } catch (err) {
    return null;
  }
};

const savedState = loadAuthState();

const initialState = {
  isAuthenticated: savedState ? savedState.isAuthenticated : false,
  user: savedState ? savedState.user : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Login olduğunda localStorage'a kaydet
      localStorage.setItem(
        "authState",
        JSON.stringify({
          isAuthenticated: true,
          user: action.payload,
        })
      );
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Logout olduğunda localStorage'dan sil
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;