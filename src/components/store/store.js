import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './cartSlice';
import currencySliceReducer from './currencySlice';
import productsSliceReducer from './productsSlice';

const store = configureStore({
	reducer: {
		currency: currencySliceReducer,
		products: productsSliceReducer,
		cart: cartSliceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
