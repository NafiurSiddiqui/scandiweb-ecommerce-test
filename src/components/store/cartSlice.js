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

			//Item exist
			if (existingItem) {
				let newCheckedItems = 0;

				items.forEach((item) => {
					//check for each item check
					let newItemCheck = item[1].map((item) => item.isChecked);
					//check if the item match with incoming item
					const existingOption = existingItem[1].find(
						(nestedItem) => nestedItem[0] === item[0]
					);
					if (existingOption) {
						const existingItemCheck = existingOption[1].map(
							(item) => item.isChecked
						);
						//if exisitng is different than newItem
						newItemCheck.forEach((check, index) => {
							if (check && !existingItemCheck[index]) {
								//updatQuantity
								newCheckedItems++;
							}
						});
					}
				});
				//make a copy of the exisiting state
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
				//if items are same
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
