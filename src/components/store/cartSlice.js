import { createSlice, current } from '@reduxjs/toolkit';

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
			// console.log('Before:', current(state.cartItems));
			// const { id, items } = action?.payload;
			// state.cartItems.push(action.payload);

			// console.log(action.payload);

			const id = action?.payload[0];
			const items = action?.payload[1];

			const itemIndex = state.cartItems.findIndex((item) => item[0] === id);

			// console.log(state.cartItems.findIndex((item)=>))

			// console.log(id, items);

			// items.forEach((item) =>
			// 	console.log(item[1].find((item) => item['value'] === '512G'))
			// );

			// console.log(state.cartItems[itemIndex]);

			if (itemIndex === -1) {
				state.cartItems.push(action?.payload);
			} else {
				//item exist, update the new value
				console.log('same id');
				items.forEach((item, index) => {
					// const nestedItemIndex = state.cartItems[itemIndex].items.findIndex(
					// 	(title) => title[0] === item[0]
					// );
					// console.log(itemIndex);
					// console.log(state.cartItems[0]);
					// if (nestedItemIndex === -1) {
					// 	state.cartItems[itemIndex].items.push(item);
					// } else {
					// 	state.cartItems[itemIndex].items[nestedItemIndex].isChecked =
					// 		item.isChecked;
					// }
				});
			}
			// console.log('After:', current(state.cartItems));
		},
		setMiniCartIsOpen: (state) => {
			state.miniCartIsOpen = !state.miniCartIsOpen;
		},
	},
});

export const { addItemToCart, setMiniCartIsOpen } = cartSlice.actions;

export default cartSlice.reducer;
