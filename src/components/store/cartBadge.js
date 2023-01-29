import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cartItems: [],
	totalAmount: 0,
};

export const cartBadgeSlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
});

export default cartBadgeSlice.reducer;
