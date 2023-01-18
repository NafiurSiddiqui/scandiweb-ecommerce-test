import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cartItems: [],
	totalAmount: 0,
	miniCartIsOpen: false,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartItems: (state, action) => {
			state.productID = action.payload;
		},

		addItemToCart: (state, action) => {
			const id = action.payload[0];
			const items = action.payload[1];

			function recursiveCheck(items, newItemValues) {
				items.forEach((item) => {
					if (Array.isArray(item[1])) {
						let subItemValues = [];
						item[1].forEach((subitem) => {
							if (subitem.hasOwnProperty('value')) {
								subItemValues.push({
									value: subitem.value,
									isChecked: subitem.isChecked,
								});
							}
						});
						newItemValues.push({ name: item[0], values: subItemValues });
					}
				});
			}

			let newItemValues = [];
			recursiveCheck(items, newItemValues);
			let existingItem = state.cartItems.find(
				(cartItem) =>
					cartItem[0] === id &&
					JSON.stringify(cartItem[1]) === JSON.stringify(newItemValues)
			);
			if (existingItem) {
				existingItem[2].quantity++;
			} else {
				let newCartItem = {
					0: id,
					1: newItemValues,
					2: { quantity: 1 },
				};
				state.cartItems.push(newCartItem);
			}
		},
		setMiniCartIsOpen: (state) => {
			state.miniCartIsOpen = !state.miniCartIsOpen;
		},
	},
});

export const { addItemToCart, setMiniCartIsOpen } = cartSlice.actions;

export default cartSlice.reducer;
