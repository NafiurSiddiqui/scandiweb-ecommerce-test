/**
 *@attItemHandler -
 * @param {obj} products
 * @returns
 */

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

	let items = [];

	for (const att in attributes) {
		const itemObj = {
			name: att,
			values: attributes[att],
		};

		items.push(itemObj);
	}

	return items;
};

/**
 *@cartItemHandler -
 * @param {object} products
 * @param {string} productID
 * @param {boolean} single
 * @returns
 */

export function cartItemHandler(products, productID, single) {
	let PDP;

	if (!single) {
		console.log(products);
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
		console.log(products);
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
		const userItems = {
			name: PDP[0].name,
			attributes: items,
			quantity: { quantity: 0 },
			brand: PDP[0].brand,
			gallery: PDP[0].gallery,
			prices: PDP[0].prices,
			inStock: PDP[0].inStock,
		};

		return [galleryOverflow, userItems];
	}
}
