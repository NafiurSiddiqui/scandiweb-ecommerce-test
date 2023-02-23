import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_ID } from './query';

/**
 *
 * @param {obj} products
 * @param {string} productID
 * @param {string} selectedCurrency
 * @returns
 */

function productHandler(products, productID, selectedCurrency) {
	// filtering out the product
	let filteredProduct = products?.filter((item) => item?.id === productID);
	// return PDP as an OBJECT
	let PDP = filteredProduct?.map((item) => {
		return {
			brand: item.brand,
			name: item.name,
			images: item.gallery,
			attributesID: item.attributes.map((item) => item.id),
			attributesItem: item.attributes.map((item) =>
				item.items.map((item) => item.id)
			),
			prices: item?.prices?.filter((item) => {
				if (selectedCurrency !== null) {
					return item.currency.label === selectedCurrency?.currency;
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
	let galleryOverflow = PDP[0]?.images?.length > 6;
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
		const userItems = [productID, items, { quantity: 0 }];
		// return userItems;
		return [PDP, galleryOverflow, attributes, userItems];
	}
}

export default productHandler;
