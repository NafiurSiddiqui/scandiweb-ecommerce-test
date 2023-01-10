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
			// state.cartItems.push(action.payload);
			// console.log('Before:', current(state.cartItems));
			// const { id, items } = action?.payload;

			const id = action.payload[0];
			const items = action.payload[1];

			console.log(action.payload);

			const itemIndex = state.cartItems.findIndex((item) => item[0] === id);
			if (itemIndex === -1) {
				state.cartItems.push([action.payload]);
			} else {
				//item exist, update the new value
				console.log('same id');
				items.forEach((item, index) => {
					const nestedItemIndex = state.cartItems[itemIndex].items.findIndex(
						(title) => title[0] === item[0]
					);
					console.log(
						state.cartItems[itemIndex].items.findIndex((i) =>
							console.log(i[0] === item[0])
						),
						item[0]
					);
					if (nestedItemIndex === -1) {
						state.cartItems[itemIndex].items.push(item);
					} else {
						state.cartItems[itemIndex].items[nestedItemIndex].isChecked =
							item.isChecked;
					}
				});
			}
			// console.log('After:', current(state.cartItems));
		},
		setMiniCartIsOpen: (state) => {
			state.miniCartIsOpen = !state.miniCartIsOpen;
		},
	},
});

// export const saveStateToLocalStorage = (state) => {
// 	try {
// 		const serializedState = JSON.stringify(state);
// 		localStorage.setItem('cartState', serializedState);
// 	} catch (error) {
// 		alert(error);
// 	}
// };

// const loadFromLocalStorage = () => {
// 	try {
// 		const serializedState = localStorage.getItem('cartState');

// 		if (serializedState === null) return undefined;

// 		return JSON.parse(serializedState);
// 	} catch (error) {
// 		alert(error);
// 		return undefined;
// 	}
// };

// export const persistedState = loadFromLocalStorage();

export const { addItemToCart, setMiniCartIsOpen } = cartSlice.actions;

export default cartSlice.reducer;
