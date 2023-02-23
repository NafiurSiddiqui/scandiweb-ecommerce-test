import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './cartSlice';
import currencySliceReducer from './currencySlice';
import productsSliceReducer from './productsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pathSliceReducers from './pathSlice';

const persistConfig = {
	key: 'cartState',
	storage,
};

const persistedCart = persistReducer(persistConfig, cartSliceReducer);

const persistedCurrency = persistReducer(persistConfig, currencySliceReducer);

const store = configureStore({
	reducer: {
		currency: currencySliceReducer,
		products: productsSliceReducer,
		cart: persistedCart,
		path: pathSliceReducers,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;

export const persistedStore = persistStore(store);
