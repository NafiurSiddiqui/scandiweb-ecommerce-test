import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	productID: '',
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		getProductID: (state, action) => {
			state.productID = action.payload;
		},
	},
});

export const { getProductID } = productsSlice.actions;

export default productsSlice.reducer;
