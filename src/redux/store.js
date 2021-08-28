import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user';

export default configureStore({
    reducer: {
        user: authSlice
    }
});