import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut, apiDelete } from '../api/apiClient';

export type Announcement = {
  _id?: string;
  title: string;
  dueDate?: string;
  items?: any[];
};

type State = {
  list: Announcement[];
  status: 'idle'|'loading'|'failed'|'succeeded';
  error?: string;
};

const initialState: State = { list: [], status: 'idle' };

export const fetchAnnouncements = createAsyncThunk('announcements/fetch', async () => {
  return apiGet<Announcement[]>('/announcements');
});

export const createQuiz = createAsyncThunk('announcements/create', async (payload: Announcement) => {
  return apiPost<Announcement>('/announcements', payload);
});

export const updateQuiz = createAsyncThunk('announcements/update', async (payload: Announcement & { id: string }) => {
  return apiPut<Announcement>(`/announcements/${payload.id}`, payload);
});

export const removeQuiz = createAsyncThunk('announcements/remove', async (id: string) => {
  return apiDelete(`/announcements/${id}`);
});

const slice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAnnouncements.pending, state => { state.status = 'loading'; })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default slice.reducer;

export const { reducer: quizzesReducer } = slice;