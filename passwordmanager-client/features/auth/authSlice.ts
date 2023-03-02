import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthToken = {
  email: string | null;
  token: string | null;
  ttl: number | null;
};

interface AuthState {
  authToken: AuthToken | null;
}

const initialState: AuthState = {
  authToken:
    typeof window !== "undefined"
      ? localStorage.getItem("authToken") !== null
        ? JSON.parse(localStorage.getItem("authToken") || "{}").ttl > Date.now()
          ? JSON.parse(localStorage.getItem("authToken") || "{}")
          : null
        : null
      : null,
};

export const createAuthToken = (email: string, token: string) => {
  return {
    email: email,
    token: token,
    ttl: Date.now() + 1 * 60 * 60 * 1000,
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<AuthToken>) => {
      typeof window !== "undefined" &&
        localStorage.setItem("authToken", JSON.stringify(action.payload));
      state.authToken = action.payload;
    },
    logout: (state) => {
      typeof window !== "undefined" && localStorage.removeItem("authToken");
      state.authToken = null;
    },
  },
});

export const { setAuthToken, logout } = authSlice.actions;

export const selectAuthToken = (state: RootState) => {
  if (
    state.auth.authToken &&
    state.auth.authToken.ttl &&
    state.auth.authToken.ttl > Date.now()
  ) {
    return state.auth.authToken;
  } else {
    logout();

    return null;
  }
};

export default authSlice.reducer;
