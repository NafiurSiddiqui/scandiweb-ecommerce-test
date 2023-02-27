import { createSlice, current } from '@reduxjs/toolkit';
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
			const prices = action.payload[5];
			const inStock = action.payload[6];

			let newItemValues = [];

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

			// console.log(current(state.cartItems));

			let existingItem = state.cartItems.find(
				(cartItem) =>
					cartItem['name'] === id &&
					JSON.stringify(cartItem['attributes']) ===
						JSON.stringify(newItemValues)
			);
			//if item exists
			if (existingItem) {
				existingItem['quantity'].quantity++;
			} else {
				let newCartItem = {
					name: id,
					attributes: newItemValues,
					quantity: { quantity: 1 },
					brand: brand,
					gallery,
					prices,
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
			const id = action.payload['name'];
			const attributes = action.payload['attributes'];

			console.log(action.payload);
			let existingItem = cartItems.find(
				(cartItem) =>
					cartItem['name'] === id &&
					JSON.stringify(cartItem['attributes']) === JSON.stringify(attributes)
			);

			// console.log(JSON.stringify(existingItem));

			if (existingItem) {
				existingItem.quantity.quantity++;
			}
		},
		decrementItem: (state, action) => {
			const { cartItems } = state;
			const id = action.payload['name'];
			const attributes = action.payload['attributes'];

			// let existingItem = cartItems.find(
			// 	(cartItem) =>
			// 		cartItem['name'] === id &&
			// 		JSON.stringify(cartItem['attributes']) === JSON.stringify(attributes)
			// );

			let existingItem = cartItems.find((cartItem) => cartItem['name'] === id);

			let existingItem2 = cartItems.findIndex(
				(cartItem) => cartItem['name'] !== id
			);

			if (existingItem) {
				//REMOVE IF 0
				if (existingItem.quantity.quantity === 1) {
					// let removedCartItem = cartItems.filter(
					// 	(item) =>
					// 		item['name'] !== id ||
					// 		JSON.stringify(item['attributes']) !== JSON.stringify(attributes)
					// );
					// let removedCartItem = cartItems.filter((item) => item['name'] !== id);
					// return {
					// 	...state,
					// 	cartItems: removedCartItem,
					// };
					// cartItems.splice(existingItem2, 1);
				}
				existingItem.quantity.quantity--;
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
