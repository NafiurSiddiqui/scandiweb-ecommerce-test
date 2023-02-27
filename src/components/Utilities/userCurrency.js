export function userCurrency(products, selectedCurrency, singleItem = false) {
	let currencies;
	let userMatchedCurrency;

	//extracting only price items
	if (!singleItem) {
		currencies = products?.map((item) =>
			item.prices.map((item) => {
				return {
					currency: item.currency.label,
					symbol: item.currency.symbol,
					amount: item.amount,
				};
			})
		);

		userMatchedCurrency = currencies?.map((item) =>
			item.find((el) =>
				selectedCurrency !== null
					? el.currency === selectedCurrency.currency
					: el.currency === 'USD'
			)
		);

		return userMatchedCurrency;
	} else {
		currencies = products.map((item) => {
			return {
				currency: item.currency.label,
				symbol: item.currency.symbol,
				amount: item.amount,
			};
		});

		userMatchedCurrency = currencies?.find((el) =>
			selectedCurrency !== null
				? el.currency === selectedCurrency.currency
				: el.currency === 'USD'
		);

		return userMatchedCurrency;
	}
}
