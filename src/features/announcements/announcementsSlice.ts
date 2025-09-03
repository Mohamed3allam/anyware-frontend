import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut, apiDelete } from '../../api/apiClient';

export type Announcement = {
  _id?: string;
  title: string;
  body: string;
  author?: string;
  date?: string;
};

type State = {
  list: Announcement[];
  status: 'idle'|'loading'|'succeeded'|'failed';
  error?: string | null;
};

const initialState: State = { list: [], status: 'idle', error: null };

export const fetchAnnouncements = createAsyncThunk('announcements/fetch', async () => {
  return apiGet<Announcement[]>('/announcements');
});

export const createAnnouncement = createAsyncThunk('announcements/create', async (payload: Announcement) => {
  return apiPost<Announcement>('/announcements', payload);
});

export const updateAnnouncement = createAsyncThunk('announcements/update', async (payload: Announcement & { id: string }) => {
  return apiPut<Announcement>(`/announcements/${payload.id}`, payload);
});

export const deleteAnnouncement = createAsyncThunk('announcements/delete', async (id: string) => {
  return apiDelete(`/announcements/${id}`);
});

const slice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    addLocalAnnouncement(state, action: PayloadAction<Announcement>) {
      state.list.unshift(action.payload);
    },
    removeLocalAnnouncement(state, action: PayloadAction<string>) {
      state.list = state.list.filter(a => a._id !== action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAnnouncements.pending, state => { state.status = 'loading'; })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load';
      })

      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.list = state.list.map(a => (a._id === action.payload._id ? action.payload : a));
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        const deletedId = (action.meta.arg as any) ?? (action.payload as any)?._id;
        state.list = state.list.filter(a => a._id !== deletedId);
      });
  }
});

export const { addLocalAnnouncement, removeLocalAnnouncement } = slice.actions;
export default slice.reducer;
