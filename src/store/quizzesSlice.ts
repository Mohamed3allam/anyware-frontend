import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut, apiDelete } from '../api/apiClient';
import { ISuccessResponse } from './response.types';

export type Quiz = {
  _id?: string;
  title: string;
  dueDate?: string;
  items?: any[];
};

type State = {
  list: Quiz[];
  status: 'idle'|'loading'|'failed'|'succeeded';
  error?: string;
};

const initialState: State = { list: [], status: 'idle' };

export const fetchQuizzes = createAsyncThunk('quizzes/fetch', async () => {
  return apiGet<ISuccessResponse<Quiz[]>>('/quizzes');
});

export const createQuiz = createAsyncThunk('quizzes/create', async (payload: Quiz) => {
  return apiPost<ISuccessResponse<Quiz>>('/quizzes', payload);
});

export const updateQuiz = createAsyncThunk('quizzes/update', async (payload: Quiz & { id: string }) => {
  return apiPut<ISuccessResponse<Quiz>>(`/quizzes/${payload.id}`, payload);
});

export const removeQuiz = createAsyncThunk('quizzes/remove', async (id: string) => {
  return apiDelete(`/quizzes/${id}`);
});

const slice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchQuizzes.pending, state => { state.status = 'loading'; })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.data;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default slice.reducer;

export const { reducer: quizzesReducer } = slice;