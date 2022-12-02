import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	productID: '',
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		getProductID: (state, action) => (state.initialState = action.payload),
	},
});
console.log(initialState);

export const { getProductId } = categorySlice.actions;

export default categorySlice.reducer;
