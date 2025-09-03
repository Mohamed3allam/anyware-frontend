// src/features/auth/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '../../api/apiClient';

export type User = {
  _id?: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

type AuthState = {
  loggedIn: boolean;
  token?: string | null;
  user?: User | null;
  status: 'idle'|'loading'|'failed'|'succeeded';
  error?: string | null;
};

const initialState: AuthState = {
  loggedIn: false,
  token: null,
  user: null,
  status: 'idle',
  error: null
};

/** Backend expected endpoints (example):
 * POST /api/auth/login { email, password } -> { token, user }
 * POST /api/auth/register { name, email, password } -> { token, user }
 * GET /api/auth/me -> { user }
 */

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: { email?: string; password?: string }, { rejectWithValue }) => {
    try {
      const res = await apiPost<{ token: string; user: User }>('/auth/login', payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await apiPost<{ token: string; user: User }>('/auth/register', payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Registration failed');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGet<{ user: User }>('/auth/me');
      return res.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch user');
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.loggedIn = false;
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loggedIn = true;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => { state.status = 'loading'; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message;
      })

      .addCase(registerUser.pending, state => { state.status = 'loading'; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message;
      })

      .addCase(fetchCurrentUser.pending, state => { state.status = 'loading'; })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(fetchCurrentUser.rejected, state => {
        state.status = 'failed';
      });
  }
});

export const { logout, setUser } = slice.actions;
export default slice.reducer;
