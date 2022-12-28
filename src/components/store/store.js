import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './cartSlice';
import categorySliceReducer from './categorySlice';
import counterReducer from './counter.js';

import currencySliceReducer from './currencySlice';
import productsSliceReducer from './productsSlice';

const store = configureStore({
	reducer: {
		category: categorySliceReducer,
		currency: currencySliceReducer,
		products: productsSliceReducer,
		cart: cartSliceReducer,
		counter: counterReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
