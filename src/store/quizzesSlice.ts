import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut, apiDelete } from '../api/apiClient';

export type QuizQuestion = {
  _id?: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
};

export type Quiz = {
  _id?: string;
  name?: string;        
  semester?: string;
  questions?: QuizQuestion[];
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  [k: string]: any;
};

type State = {
  list: Quiz[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
};

const initialState: State = { list: [], status: 'idle', error: null };

function unwrapData<T>(res: any): T {
  if (!res) return res;
  if (typeof res === 'object' && 'data' in res) return res.data as T;
  return res as T;
}

export const fetchQuizzes = createAsyncThunk('quizzes/fetch', async () => {
  const res = await apiGet<any>('/quizzes');
  return unwrapData<Quiz[]>(res);
});

export const createQuiz = createAsyncThunk('quizzes/create', async (payload: Quiz) => {
  const res = await apiPost<any>('/quizzes', payload);
  const data = unwrapData<Quiz | Quiz[]>(res);
  if (Array.isArray(data)) return data[0] as Quiz;
  return data as Quiz;
});

export const updateQuiz = createAsyncThunk(
  'quizzes/update',
  async (payload: Quiz & { id: string }) => {
    const res = await apiPut<any>(`/quizzes/${payload.id}`, payload);
    return unwrapData<Quiz>(res);
  }
);

export const deleteQuiz = createAsyncThunk('quizzes/delete', async (id: string) => {
  const res = await apiDelete<any>(`/quizzes/${id}`);
  const data = unwrapData<any>(res);
  if (data && data._id) return data._id;
  return id;
});

const slice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    addQuizLocal(state, action: PayloadAction<Quiz>) {
      state.list.unshift(action.payload);
    },
    removeQuizLocal(state, action: PayloadAction<string>) {
      state.list = state.list.filter((q) => q._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action: PayloadAction<Quiz[]>) => {
        state.status = 'succeeded';
        state.list = action.payload ?? [];
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load quizzes';
      })

      .addCase(createQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
        state.list.unshift(action.payload);
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.error = action.error.message ?? 'Create quiz failed';
      })

      .addCase(updateQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
        state.list = state.list.map((q) => (q._id === action.payload._id ? action.payload : q));
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.error = action.error.message ?? 'Update quiz failed';
      })

      .addCase(deleteQuiz.fulfilled, (state, action: PayloadAction<string>) => {
        const deletedId = action.payload;
        state.list = state.list.filter((q) => q._id !== deletedId);
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.error = action.error.message ?? 'Delete quiz failed';
      });
  }
});

export const { addQuizLocal, removeQuizLocal } = slice.actions;
export default slice.reducer;
