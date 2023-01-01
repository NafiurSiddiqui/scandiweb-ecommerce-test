import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	products: null,
	selectedProduct: null,
	productID: '',
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
			console.log(current(state));
		},
	},
});

export const { setProducts, setSelectedProduct, getProductID } =
	productsSlice.actions;

export default productsSlice.reducer;
