import { createSlice } from '@reduxjs/toolkit';
import { roundToTwoDecimalPlaces } from '../Utilities/numberRounder';

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
		addItemToCart: (state, action) => {
			const id = action.payload[0];
			const items = action.payload[1];
			const brand = action.payload[3];
			const gallery = action.payload[4];
			const price = action.payload[5];
			const inStock = action.payload[6];

			let newItemValues = [];
			// console.log(items);

			// console.log(action.payload);

			//Adding user check to the attributes
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

			let existingItem = state.cartItems.find(
				(cartItem) =>
					cartItem[0] === id &&
					JSON.stringify(cartItem[1]) === JSON.stringify(newItemValues)
			);
			//if item exists
			if (existingItem) {
				existingItem[2].quantity++;
			} else {
				// let newCartItem = {
				// 	0: id,
				// 	1: newItemValues,
				// 	2: { quantity: 1 },
				// 	3: brand,
				// 	4: gallery,
				// 	5: price,
				// 	6: inStock,
				// };
				let newCartItem = {
					name: id,
					attributes: newItemValues,
					quantity: { quantity: 1 },
					brand: brand,
					gallery,
					price,
					inStock,
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
				existingItem.quantity.quantity++;
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
					let removedCartItem = cartItems.filter(
						(item) =>
							item[0] !== id ||
							JSON.stringify(item[1]) !== JSON.stringify(items)
					);

					return {
						...state,
						cartItems: removedCartItem,
					};
				}
				existingItem[2].quantity--;
			}
		},

		cartTotalHandler: (state, action) => {
			let price = action.payload;

			if (price !== 0) {
				let total = price.reduce((acc, cur) => acc + cur, 0);

				state.cartTotal = roundToTwoDecimalPlaces(total);
			} else {
				state.cartTotal = 0.0;
			}
		},
		cartTaxHandler: (state) => {
			state.cartTotalTax = ((state.cartTotal / 100) * 21).toFixed(2);
		},
		cartQuantityHandler: (state) => {
			// const items = state.cartItems.map((item) => item[2].quantity);
			const items = state.cartItems.map((item) => item.quantity.quantity);
			// console.log(items);
			let newItems = items.reduce((acc, cur) => acc + cur, 0);
			state.cartQuantity = newItems;
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
