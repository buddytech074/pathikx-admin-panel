import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchComplaints = createAsyncThunk(
    'complaints/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/admin/complaints');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch complaints');
        }
    }
);

export const resolveComplaint = createAsyncThunk(
    'complaints/resolve',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/admin/complaints/${id}/resolve`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to resolve complaint');
        }
    }
);

const complaintsSlice = createSlice({
    name: 'complaints',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComplaints.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComplaints.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchComplaints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Resolve
            .addCase(resolveComplaint.fulfilled, (state, action) => {
                const index = state.list.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    },
});

export default complaintsSlice.reducer;
