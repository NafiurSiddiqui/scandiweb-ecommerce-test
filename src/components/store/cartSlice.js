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
			const id = action?.payload[0];
			const items = action?.payload[1];

			const existingItem = state.cartItems.find((item) => item[0] === id);
			const itemIndex = state.cartItems.findIndex((item) => item[0] === id);

			if (existingItem) {
				let isSame = true;

				items.forEach((item) => {
					let newItemCheck = item[1].map((item) => item.isChecked);

					const existingOption = existingItem[1].find(
						(nestedItem) => nestedItem[0] === item[0]
					);

					if (existingOption) {
						const existingItemCheck = existingOption[1].map(
							(item) => item.isChecked
						);

						const equal = existingItemCheck.every(
							(item, i) => item === newItemCheck[i]
						);

						if (!equal) {
							isSame = false;
						}
					}
				});

				if (isSame) {
					//check how many of them are isChecked and raise quanity
					let itemCount = 0;

					items.forEach((item) => {
						itemCount += item[1].filter(
							(nestedItem) => nestedItem.isChecked
						).length;
					});

					let newCartItems = [...state.cartItems];

					let updatedItem = { ...newCartItems[itemIndex] };

					updatedItem[2] = {
						...updatedItem[2],
						quantity: updatedItem[2].quantity + itemCount,
					};

					newCartItems[itemIndex] = updatedItem;

					return {
						...state,
						cartItems: newCartItems,
					};
					//if no new items isChecked, raise 1
				} else {
					let newCartItems = [...state.cartItems];

					newCartItems.splice(itemIndex, 1);

					let newItem = { ...action.payload };

					newItem[2] = { quantity: 1 };

					newCartItems.push(newItem);

					return {
						...state,
						cartItems: newCartItems,
					};
				}
			} else {
				let newCartItems = [...state.cartItems];
				let newItem = { ...action.payload };

				newItem[2] = { quantity: 1 };

				newCartItems.push(newItem);

				return {
					...state,
					cartItems: newCartItems,
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
