import { configureStore } from '@reduxjs/toolkit';
import categorySliceReducer from './categorySlice';
import currencySliceReducer from './currencySlice';
import productsSliceReducer from './productsSlice';

const store = configureStore({
	reducer: {
		category: categorySliceReducer,
		currency: currencySliceReducer,
		products: productsSliceReducer,
	},
});

export default store;
