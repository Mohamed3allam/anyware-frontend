import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  loggedIn: boolean;
};

const initialState: AuthState = { loggedIn: false };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) { state.loggedIn = true; },
    logout(state) { state.loggedIn = false; }
  }
});

export const { login, logout } = slice.actions;
export default slice.reducer;
