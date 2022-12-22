import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cartItems: [],
	totalAmount: 0,
};

export const cartSlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCartItems: (state, action) => {
			state.productID = action.payload;
		},
		addItemToCart: (state, action) => {
			// state.cartItems.push(action.payload);
			// const existingCartItemIndex = state.cartItems.findIndex(
			// 	(item) => item === action.payload
			// );
			// console.log(existingCartItemIndex);
			// state.cartItems.push(action.payload);
			// const existingCartItemIndex = state.cartItems.findIndex(
			// 	(item) => item === action.payload
			// );
			// console.log(existingCartItemIndex);
			// const existingCartItem = state.cartItems[existingCartItemIndex];
			// let updatedCartItems;
			// if (existingCartItem) {
			// 	const updatedItems = [...state.cartItems];
			// 	updatedItems[existingCartItemIndex] = updatedCartItems;
			// } else {
			// 	updatedCartItems = state.cartItems.concat(action.payload);
			// }
		},
	},
});

export const { addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
