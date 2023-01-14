function productHandler(products, productID, selectedCurrency) {
	// getting the right data
	let filteredProduct = products.filter((item) => item.id === productID);

	// return PDP as an OBJECT
	let PDP = filteredProduct.map((item) => {
		return {
			brand: item.brand,
			name: item.name,
			images: item.gallery,
			attributesID: item.attributes.map((item) => item.id),
			attributesItem: item.attributes.map((item) =>
				item.items.map((item) => item.id)
			),

			prices: item.prices.filter((item) => {
				if (selectedCurrency !== null) {
					return item.currency.label === selectedCurrency.currency;
				} else {
					return item.currency.label === 'USD';
				}
			}),
			get amount() {
				return this.prices[0].amount;
			},
			stock: item.inStock,
		};
	});

	//gallery overFlow guard

	let galleryOverflow = PDP[0].images.length > 6;

	//converted attributes
	const attID = PDP[0].attributesID;
	const attItems = PDP[0].attributesItem;
	//default values set
	const mappedAttItems = attItems.map((itemT) =>
		itemT.map((item, index) => {
			return { value: item, isChecked: index === 0 };
		})
	);

	const attributes = attID.reduce((acc, key, index) => {
		acc[key] = mappedAttItems[index];
		return acc;
	}, {});

	const items = Object.entries(attributes);

	const userItems = [productID, items];

	// return userItems;
	return [PDP, galleryOverflow, userItems];
}

export default productHandler;
