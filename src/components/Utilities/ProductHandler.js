/**
 *
 * @param {obj} products
 * @param {string} productID
 * @param {string} selectedCurrency
 * @returns
 */

import { userCurrency } from './userCurrency';

// function productHandler(products, productID, selectedCurrency) {
// 	// filtering out the product
// 	let filteredProduct = products?.filter((item) => item?.id === productID);
// 	// return PDP as an OBJECT
// 	let PDP = filteredProduct?.map((item) => {
// 		return {
// 			brand: item.brand,
// 			name: item.name,
// 			gallery: item.gallery,
// 			attributesID: item.attributes.map((item) => item.id),
// 			attributesItem: item.attributes.map((item) =>
// 				item.items.map((item) => item.id)
// 			),
// 			prices: item?.prices?.filter((item) => {
// 				if (selectedCurrency !== null) {
// 					return item.currency.label === selectedCurrency?.currency;
// 				} else {
// 					return item.currency.label === 'USD';
// 				}
// 			}),
// 			get amount() {
// 				return this.prices[0].amount;
// 			},
// 			stock: item.inStock,
// 		};
// 	});
// 	//gallery overFlow guard
// 	let galleryOverflow = PDP[0]?.images?.length > 6;
// 	//converted attributes
// 	const attID = PDP[0]?.attributesID;
// 	const attItems = PDP[0]?.attributesItem;
// 	//default values set
// 	const mappedAttItems = attItems?.map((itemT) =>
// 		itemT.map((item, index) => {
// 			return { value: item, isChecked: index === 0 };
// 		})
// 	);
// 	const attributes = attID?.reduce((acc, key, index) => {
// 		acc[key] = mappedAttItems[index];
// 		return acc;
// 	}, {});

// 	if (!attributes) {
// 		return;
// 	} else {
// 		const items = Object.entries(attributes);
// 		const userItems = [productID, items, { quantity: 0 }];

// 		return [PDP, galleryOverflow, attributes, userItems];
// 	}
// }

// export default productHandler;

export const attHandler = (att) => {
	//converted attributes
	const attID = att?.map((item) => item.id);

	const attItems = att?.map((item) => item.items.map((item) => item.id));

	//default values set
	const mappedAttItems = attItems?.map((itemT) =>
		itemT.map((item, index) => {
			return { value: item, isChecked: index === 0 };
		})
	);

	const attributes = attID?.reduce((acc, key, index) => {
		acc[key] = mappedAttItems[index];
		return acc;
	}, {});

	// const items = Object.entries(attributes);

	let items = [];

	for (const att in attributes) {
		const itemObj = {
			name: att,
			values: attributes[att],
		};

		items.push(itemObj);
	}

	// return attributes;

	return items;
};

export function cartItemHandler(products, productID, selectedCurrency, single) {
	let PDP;

	if (!single) {
		console.log('should NOT be from here');

		// filtering out the product
		let filteredProduct = products?.filter((item) => item?.id === productID);
		// return PDP as an OBJECT
		PDP = filteredProduct?.map((item) => {
			return {
				brand: item.brand,
				name: item.name,
				gallery: item.gallery,
				attributesID: item.attributes.map((item) => item.id),
				attributesItem: item.attributes.map((item) =>
					item.items.map((item) => item.id)
				),
				// prices: item?.prices?.filter((item) => {
				// 	if (selectedCurrency !== null) {
				// 		return item.currency.label === selectedCurrency?.currency;
				// 	} else {
				// 		return item.currency.label === 'USD';
				// 	}
				// }),
				price: userCurrency(products, selectedCurrency, false),
				get amount() {
					return this.prices[0].amount;
				},
				inStock: item.inStock,
			};
		});
		// return PDP;
	} else {
		console.log('should be from here');

		PDP = products?.map((item) => {
			return {
				brand: item.brand,
				name: item.name,
				gallery: item.gallery,
				attributesID: item.attributes.map((item) => item.id),
				attributesItem: item.attributes.map((item) =>
					item.items.map((item) => item.id)
				),
				// prices: item?.prices?.filter((item) => {
				// 	if (selectedCurrency !== null) {
				// 		return item.currency.label === selectedCurrency?.currency;
				// 	} else {
				// 		return item.currency.label === 'USD';
				// 	}
				// }),
				prices: userCurrency(products, selectedCurrency, true),
				get amount() {
					return this.prices[0].amount;
				},
				inStock: item.inStock,
			};
		});

		// return PDP;
	}

	//gallery overFlow guard
	let galleryOverflow = PDP[0]?.gallery?.length > 6;
	//converted attributes
	const attID = PDP[0]?.attributesID;
	const attItems = PDP[0]?.attributesItem;
	//default values set
	const mappedAttItems = attItems?.map((itemT) =>
		itemT.map((item, index) => {
			return { value: item, isChecked: index === 0 };
		})
	);
	const attributes = attID?.reduce((acc, key, index) => {
		acc[key] = mappedAttItems[index];
		return acc;
	}, {});

	if (!attributes) {
		return;
	} else {
		const items = Object.entries(attributes);
		// const userItems = [productID, items, { quantity: 0 }];
		const userItems = [
			PDP[0].name,
			items,
			{ quantity: 0 },
			PDP[0].brand,
			PDP[0].gallery,
			PDP[0].prices,
			PDP[0].inStock,
		];

		return [galleryOverflow, userItems];
	}
}
