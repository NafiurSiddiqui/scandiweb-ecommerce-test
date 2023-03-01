/**
 *
 * @param {obj} products
 * @param {string} productID
 * @param {string} selectedCurrency
 * @returns
 */

import { userCurrency } from './userCurrency';

export const attHandler = (att) => {
	//converted attributes
	const attID = att?.map((item) => item.id);

	const attItems = att?.map((item) => item.items.map((item) => item.value));

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
					item.items.map((item) => item.value)
				),

				prices: item.prices,
				get amount() {
					return this.prices[0].amount;
				},
				inStock: item.inStock,
			};
		});
		// return PDP;
	} else {
		console.log('single product');
		PDP = products?.map((item) => {
			return {
				brand: item.brand,
				name: item.name,
				gallery: item.gallery,
				attributesID: item.attributes.map((item) => item.id),
				attributesItem: item.attributes.map((item) =>
					item.items.map((item) => item.value)
				),
				prices: item.prices,
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
	// const attributes = attID?.reduce((acc, key, index) => {
	// 	acc[key] = mappedAttItems[index];
	// 	return acc;
	// }, []);

	let items = [];

	for (const att in attributes) {
		const itemObj = {
			name: att,
			values: attributes[att],
		};

		items.push(itemObj);
	}

	if (!attributes) {
		return;
	} else {
		// const items = Object.entries(attributes);
		// const userItems = [productID, items, { quantity: 0 }];
		// const userItems = [
		// 	PDP[0].name,
		// 	items,
		// 	{ quantity: 0 },
		// 	PDP[0].brand,
		// 	PDP[0].gallery,
		// 	PDP[0].prices,
		// 	PDP[0].inStock,
		// ];
		const userItems = {
			name: PDP[0].name,
			attributes: items,
			// attributes: attributes,
			quantity: { quantity: 0 },
			brand: PDP[0].brand,
			gallery: PDP[0].gallery,
			prices: PDP[0].prices,
			inStock: PDP[0].inStock,
		};

		return [galleryOverflow, userItems];
	}
}
