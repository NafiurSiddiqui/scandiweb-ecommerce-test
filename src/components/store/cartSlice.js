import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cartItems: [],
};

export const cartSlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCartItems: (state, action) => {
			state.productID = action.payload;
		},
	},
});

export const { getProductID } = cartSlice.actions;

export default cartSlice.reducer;
