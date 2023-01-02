import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	products: null,
	selectedProduct: [],
	productID: '',
	productValues: [],
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		},
		setSelectedProduct: (state, action) => {
			let itemValues = action.payload.itemValues;
			let itemHeading = action.payload.id;

			const itemIsInProducts = state.selectedProduct?.map(
				(item) => item?.id === itemHeading
			);

			// console.log(itemIsInProducts);
			//if itemHead is in the products, push the items to the values only

			if (itemIsInProducts) {
				let newItems = {
					id: itemHeading,
					itemValues: [...itemValues],
				};

				state.selectedProduct.push(newItems);
			}

			if (itemValues?.length === 0) {
				const removedItem = state.selectedProduct.map(
					(item) => item.itemValues.length !== 0
				);

				// state.selectedProduct.itemValues = removedItem;
			}
			// console.log(current(state.selectedProduct));
		},
		getProductID: (state, action) => {
			state.productID = action.payload;
		},
		getProductValues: (state, action) => {
			state.productValues.push(action.payload);
			console.log(current(state));
		},
	},
});

export const {
	setProducts,
	setSelectedProduct,
	getProductID,
	getProductValues,
} = productsSlice.actions;

export default productsSlice.reducer;
