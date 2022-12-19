import { configureStore } from '@reduxjs/toolkit';
import categorySliceReducer from './categorySlice';
import currencySliceReducer from './currencySlice';

const store = configureStore({
	reducer: {
		category: categorySliceReducer,
		currency: currencySliceReducer,
	},
});

export default store;
