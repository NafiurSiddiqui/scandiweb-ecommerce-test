import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	products: null,
	selectedProduct: null,
	productID: '',
	productValues: [],
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		},
		setSelectedProduct: (state, action) => {
			state.selectedProduct = action.payload;
		},
		getProductID: (state, action) => {
			state.productID = action.payload;
		},
		getProductValues: (state, action) => {
			state.productValues.push(action.payload);
			console.log(current(state));
		},
	},
});

export const {
	setProducts,
	setSelectedProduct,
	getProductID,
	getProductValues,
} = productsSlice.actions;

export default productsSlice.reducer;
