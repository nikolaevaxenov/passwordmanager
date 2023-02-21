import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  email: typeof window !== "undefined" ? localStorage.getItem("email") : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      localStorage.setItem("email", action.payload);
      state.email = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      state.email = null;
      state.token = null;
    },
  },
});

export const { setEmail, setToken, logout } = authSlice.actions;

export const selectEmail = (state: AuthState) => state?.email;
export const selectToken = (state: AuthState) => state?.token;

export default authSlice.reducer;
