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
			console.log('CUR', current(state.cartItems));

			const existingItem = state.cartItems.find((item) => item[0] === id);
			const itemIndex = state.cartItems.findIndex((item) => item[0] === id);

			// console.log(JSON.stringify(state.cartItems[itemIndex]));

			if (existingItem) {
				let isSame = true;

				// console.log(items);

				items.forEach((item) => {
					// console.log(existingItem[1]);
					// console.log(item[1].map((item) => item.isChecked));
					let newItemCheck = item[1].map((item) => item.isChecked);

					console.log(newItemCheck);
					const existingOption = existingItem[1].find(
						(nestedItem) => nestedItem[0] === item[0]
					);

					// console.log(existingOption);

					if (existingOption) {
						// console.log(JSON.stringify(existingOption[1]));
						// console.log(existingOption[1].map((item) => item.isChecked));
						const existingItemCheck = existingOption[1].map(
							(item) => item.isChecked
						);
						console.log(existingItemCheck);

						const equal = existingItemCheck.every(
							(item, i) => item === newItemCheck[i]
						);

						console.log(!equal);

						if (!equal) {
							isSame = false;
						}
					}
				});

				if (isSame) {
					console.log('Duplicate push');
					console.log('CUR', current(state.cartItems));
					return;
				} else {
					let newCartItems = [...state.cartItems];
					// console.log(JSON.stringify(newCartItems));

					newCartItems.splice(itemIndex, 1);
					// console.log(JSON.stringify(newCartItems));

					newCartItems.push(action.payload);

					return {
						...state,
						cartItems: newCartItems,
					};
					// state.cartItems.push(newCartItems);
				}
			} else {
				// state.cartItems.push(action.payload);

				return {
					...state,
					cartItems: [...state.cartItems, action.payload],
				};
			}
		},

		setMiniCartIsOpen: (state) => {
			state.miniCartIsOpen = !state.miniCartIsOpen;
		},
	},
});

export const { addItemToCart, setMiniCartIsOpen } = cartSlice.actions;

export default cartSlice.reducer;
