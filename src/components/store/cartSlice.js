import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	cartItems: [],
	totalAmount: 0,
	miniCartIsOpen: false,
};

export const cartSlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCartItems: (state, action) => {
			state.productID = action.payload;
		},
		addItemToCart: (state, action) => {
			console.log('Before:', current(state.cartItems));

			const { id, items } = action.payload;

			const itemIndex = state.cartItems.findIndex((item) => item.id === id);

			if (itemIndex === -1) {
				state.cartItems.push({ id, items });
			} else {
				//item exist, update the new value
				items.forEach((item, index) => {
					const nestedItemIndex = state.cartItems[itemIndex].items.findIndex(
						(title) => title[0] === item[0]
					);
					if (nestedItemIndex === -1) {
						state.cartItems[itemIndex].items.push(item);
					} else {
						state.cartItems[itemIndex].items[nestedItemIndex].isChecked =
							item.isChecked;
					}
				});
			}

			console.log('After:', current(state.cartItems));
		},
		setMiniCartIsOpen: (state) => {
			state.miniCartIsOpen = !state.miniCartIsOpen;
		},
	},
});

export const { addItemToCart, setMiniCartIsOpen } = cartSlice.actions;

export default cartSlice.reducer;
