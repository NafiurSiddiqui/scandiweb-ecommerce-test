import { configureStore } from '@reduxjs/toolkit';
import categorySliceReducer from './categorySlice';

const store = configureStore({
	reducer: {
		category: categorySliceReducer,
	},
});

export default store;
