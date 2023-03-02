import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: null,
	productID: '',
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		// setProducts: (state, action) => {
		// 	state.products = action.payload;
		// },
		getProductID: (state, action) => {
			state.productID = action.payload;
		},
	},
});

export const { setProducts, setSelectedProduct, getProductID } =
	productsSlice.actions;

export default productsSlice.reducer;
