import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchUsers = createAsyncThunk(
    'users/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/admin/users');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
        }
    }
);

export const blockUser = createAsyncThunk(
    'users/block',
    async (id, { rejectWithValue }) => {
        try {
            await api.post(`/api/admin/users/${id}/block`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to block user');
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(blockUser.fulfilled, (state, action) => {
                // Toggle status locally for immediate feedback, assuming generic 'BLOCKED' logic
                const user = state.list.find(u => u.id === action.payload);
                if (user) {
                    // Simplistic toggle or just re-fetch
                    // user.status = 'BLOCKED'; // In real app, re-fetch or return updated user
                }
            });
    },
});

export default usersSlice.reducer;
