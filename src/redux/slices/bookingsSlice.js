import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchBookings = createAsyncThunk(
    'bookings/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/admin/bookings');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
        }
    }
);

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bookingsSlice.reducer;
