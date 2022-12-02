import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	productID: null,
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		getProductID: (state, action) => {
			state.productID = action.payload;
		},
	},
});

export const { getProductID } = categorySlice.actions;

export default categorySlice.reducer;
