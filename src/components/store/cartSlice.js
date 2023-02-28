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
			// const id = action.payload[0];
			// const items = action.payload[1];
			// const brand = action.payload[3];
			// const gallery = action.payload[4];
			// const prices = action.payload[5];
			// const inStock = action.payload[6];
			const id = action.payload.name;
			const items = action.payload.attributes;
			const brand = action.payload.brand;
			const gallery = action.payload.gallery;
			const prices = action.payload.prices;
			const inStock = action.payload.inStock;

			let newItemValues = [];
			// console.log(action.payload);
			// console.log(action.payload.name);
			console.log(action.payload.attributes);
			//Adding user selection to the attributes
			items.forEach((item) => {
				if (Array.isArray(item.values)) {
					let subItemValues = [];
					item.values.forEach((subItem) => {
						if (subItem.hasOwnProperty('value')) {
							subItemValues.push({
								value: subItem.value,
								isChecked: subItem.isChecked,
							});
						}
					});
					newItemValues.push({ name: item.name, values: subItemValues });
				}
			});

			console.log(newItemValues);

			let existingItem = state.cartItems.find(
				(cartItem) =>
					cartItem.name === id &&
					JSON.stringify(cartItem.attributes) === JSON.stringify(newItemValues)
			);
			//if item exists
			if (existingItem) {
				// existingItem['quantity'].quantity++;
				// existingItem.attributes = items;
				existingItem.quantity.quantity++;
			} else {
				let newCartItem = {
					name: id,
					attributes: newItemValues,
					// attributes: items,
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

			let existingItem = cartItems.find((cartItem) => cartItem['name'] === id);

			if (existingItem) {
				// REMOVE IF 0
				if (existingItem.quantity.quantity === 1) {
					let removedCartItem = cartItems.filter(
						(item) =>
							item['name'] !== id ||
							JSON.stringify(item['attributes']) !== JSON.stringify(attributes)
					);

					return {
						...state,
						cartItems: removedCartItem,
					};
				} else {
					existingItem.quantity.quantity--;
				}
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
