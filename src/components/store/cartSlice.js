import { createSlice, current } from '@reduxjs/toolkit';
import { produce } from 'immer';

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
			const id = action?.payload[0];
			const items = action?.payload[1];

			// console.log(name, options);

			const existingItem = state.cartItems.find((item) => item[0] === id);

			if (existingItem) {
				let isSame = true;

				items.forEach(([attributeName, { value, isChecked }]) => {
					// console.log(existingItem[1]);
					const existingOption = existingItem[1].find(
						(item) => item[0] === attributeName
					);

					if (existingOption) {
						// console.log(JSON.stringify(existingOption[1]));
						if (existingOption[1].isChecked !== isChecked) {
							// console.log('not same');
							isSame = false;
						} else {
							isSame = false;
						}
					}
				});

				if (isSame) {
					return;
				} else {
					// const updatedItems = state.cartItems.filter((item) => item[0] !== id);

					const newState = Object.assign({}, state);

					newState.cartItems = state.cartItems.filter((item) => item[0] !== id);

					newState.cartItems.push(action.payload);

					return newState;

					// state.cartItems.push(updatedItems);
				}
			} else {
				state.cartItems.push(action.payload);
			}
		},

		setMiniCartIsOpen: (state) => {
			state.miniCartIsOpen = !state.miniCartIsOpen;
		},
	},
});

export const { addItemToCart, setMiniCartIsOpen } = cartSlice.actions;

export default cartSlice.reducer;
