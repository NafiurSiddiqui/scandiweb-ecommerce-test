import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	cartItems: [],
	cartTotal: 0,
	cartPricing: [],
	miniCartIsOpen: false,
	cartTotalTax: 0,
	cartQuantity: 0,
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

			//Recursive model
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
		incrementItem: (state, action) => {
			const { cartItems } = state;
			const id = action.payload[0];
			const items = action.payload[1];

			let existingItem = cartItems.find(
				(cartItem) =>
					cartItem[0] === id &&
					JSON.stringify(cartItem[1]) === JSON.stringify(items)
			);

			if (existingItem) {
				existingItem[2].quantity++;
			}
		},
		decrementItem: (state, action) => {
			const { cartItems } = state;
			const id = action.payload[0];
			const items = action.payload[1];

			let existingItem = cartItems.find(
				(cartItem) =>
					cartItem[0] === id &&
					JSON.stringify(cartItem[1]) === JSON.stringify(items)
			);

			if (existingItem) {
				//REMOVE IF 0
				if (existingItem[2].quantity === 1) {
					let removedCartItem = cartItems.filter((item) => item[0] !== id);

					return {
						...state,
						cartItems: removedCartItem,
					};
				}
				existingItem[2].quantity--;
			}
		},
		cartTotalHandler: (state, action) => {
			let prices = action.payload;

			if (prices !== 0) {
				let total = prices.reduce((acc, cur) => acc + cur, 0);

				state.cartTotal = Number(total.toFixed(2));
			} else {
				state.cartTotal = 0;
			}
		},
		cartTaxHandler: (state) => {
			state.cartTotalTax = ((state.cartTotal / 100) * 21).toFixed(2);
		},
		cartQuantityHandler: (state) => {
			const items = state.cartItems.map((item) => item[2].quantity);

			// if (state.cartItems.length === 0) {
			// 	state.cartQuantity = 0;
			// }

			if (state.cartItems.length === 1) {
				state.cartQuantity = items;
			} else if (state.cartItems.length > 1) {
				let newItems = items.reduce((acc, cur) => acc + cur, 0);
				state.cartQuantity = newItems;
			} else {
				state.cartQuantity = 0;
			}
		},
	},
});

export const {
	addItemToCart,
	setMiniCartIsOpen,
	incrementItem,
	decrementItem,
	cartTotalHandler,
	cartPricingHandler,
	cartTaxHandler,
	cartQuantityHandler,
} = cartSlice.actions;

export default cartSlice.reducer;
