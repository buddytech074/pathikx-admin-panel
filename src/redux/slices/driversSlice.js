import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPendingDrivers = createAsyncThunk(
    'drivers/fetchPending',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/admin/drivers/pending');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch pending drivers');
        }
    }
);

export const verifyDriver = createAsyncThunk(
    'drivers/verify',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/admin/drivers/${id}/verify`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to verify driver');
        }
    }
);

const driversSlice = createSlice({
    name: 'drivers',
    initialState: {
        pendingList: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPendingDrivers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPendingDrivers.fulfilled, (state, action) => {
                state.loading = false;
                state.pendingList = action.payload;
            })
            .addCase(fetchPendingDrivers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyDriver.fulfilled, (state, action) => {
                state.pendingList = state.pendingList.filter(d => d.id !== action.payload.id);
            });
    },
});

export default driversSlice.reducer;
