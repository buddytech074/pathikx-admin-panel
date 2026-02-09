import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import complaintsReducer from './slices/complaintsSlice';
import usersReducer from './slices/usersSlice';
import driversReducer from './slices/driversSlice';
import bookingsReducer from './slices/bookingsSlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        complaints: complaintsReducer,
        users: usersReducer,
        drivers: driversReducer,
        bookings: bookingsReducer,
    },
});
