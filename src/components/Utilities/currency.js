export function userCurrency(products, selectedCurrency, singleItem = false) {
	let currencies;
	let userMatchedCurrency;
	//extracting only price items
	if (!singleItem) {
		console.log('Product itemS');
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
		console.log('This is pure product item');
		currencies = products.prices.map((item) => {
			return {
				currency: item.currency.label,
				symbol: item.currency.symbol,
				amount: item.amount,
			};
		});

		console.log(
			currencies?.find((el) =>
				selectedCurrency !== null
					? el.currency === selectedCurrency.currency
					: el.currency === 'USD'
			)
		);

		userMatchedCurrency = currencies?.find((el) =>
			selectedCurrency !== null
				? el.currency === selectedCurrency.currency
				: el.currency === 'USD'
		);

		return userMatchedCurrency;
	}
}
