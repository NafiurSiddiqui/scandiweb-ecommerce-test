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

			// console.log(items);

			const existingItem = state.cartItems.find((item) => item[0] === id);
			const itemIndex = state.cartItems.findIndex((item) => item[0] === id);

			if (existingItem) {
				let newCheckedItems = 0;
				items.forEach((item) => {
					let newItemCheck = item[1].map((item) => item.isChecked);

					const existingOption = existingItem[1].find(
						(nestedItem) => nestedItem[0] === item[0]
					);
					if (existingOption) {
						const existingItemCheck = existingOption[1].map(
							(item) => item.isChecked
						);

						newItemCheck.forEach((check, index) => {
							// console.log('checkIndex ', existingItemCheck[index]);
							console.log('Check ', check);
							if (check && !existingItemCheck[index]) {
								newCheckedItems++;
							}
						});
					}
				});
				let newCartItems = [...state.cartItems];

				newCartItems[itemIndex] = {
					...newCartItems[itemIndex],
					1: items,
					2: {
						...newCartItems[itemIndex][2],
						quantity: newCartItems[itemIndex][2].quantity + newCheckedItems + 1,
					},
				};
				return {
					...state,
					cartItems: newCartItems,
				};
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
