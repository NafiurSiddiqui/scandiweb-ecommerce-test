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
			const existingItem = state.cartItems.cartItems.find(
				(item) => item[0] === id
			);

			if (existingItem) {
				if (JSON.stringify(existingItem[1]) !== JSON.stringify(items)) {
					let newItem = { ...action.payload };
					newItem[2] = { quantity: 1 };
					state.cartItems.push(newItem);
				} else {
					existingItem[2].quantity++;
				}
			} else {
				let newItem = { ...action.payload };
				newItem[2] = { quantity: 1 };
				state.cartItems.push(newItem);
			}
		},
		// addItemToCart: (state, action) => {
		// 	const id = action.payload[0];
		// 	const items = action.payload[1];
		// 	const existingItem = state.cartItems.find((item) => item[0] === id);

		// 	if (existingItem) {
		// 		if (JSON.stringify(existingItem[1]) !== JSON.stringify(items)) {
		// 			items.forEach((item) => {
		// 				let newItemCheck = item[1].map((item) => item.isChecked);

		// 				for (let i = 0; i < newItemCheck.length; i++) {
		// 					if (newItemCheck[i]) {
		// 						let newCartItem = {
		// 							0: id,
		// 							1: [item[0], { value: item[1][i].value, isChecked: true }],
		// 							2: { quantity: 1 },
		// 						};
		// 						state.cartItems.push(newCartItem);
		// 					} else {
		// 						item[1][i].isChecked = false;
		// 					}
		// 				}
		// 			});
		// 		} else {
		// 			existingItem[2].quantity++;
		// 		}
		// 	} else {
		// 		items.forEach((item) => {
		// 			let newItemCheck = item[1].map((item) => item.isChecked);
		// 			for (let i = 0; i < newItemCheck.length; i++) {
		// 				if (newItemCheck[i]) {
		// 					let newCartItem = {
		// 						0: id,
		// 						1: [item[0], { value: item[1][i].value, isChecked: true }],
		// 						2: { quantity: 1 },
		// 					};
		// 					state.cartItems.push(newCartItem);
		// 				} else {
		// 					item[1][i].isChecked = false;
		// 				}
		// 			}
		// 		});
		// 	}
		// },

		setMiniCartIsOpen: (state) => {
			state.miniCartIsOpen = !state.miniCartIsOpen;
		},
	},
});

export const { addItemToCart, setMiniCartIsOpen } = cartSlice.actions;

export default cartSlice.reducer;
