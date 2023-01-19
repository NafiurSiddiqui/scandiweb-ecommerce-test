export function userCurrency(products, selectedCurrency) {
	//extracting only price items
	const currencies = products?.map((item) =>
		item.prices.map((item) => {
			return {
				currency: item.currency.label,
				symbol: item.currency.symbol,
				amount: item.amount,
			};
		})
	);

	//ensure user's currency selection
	const matchedUserPrice = currencies?.map((item) =>
		item.find((el) => {
			if (selectedCurrency !== null) {
				return el.currency === selectedCurrency.currency;
			} else {
				return el.currency === 'USD';
			}
		})
	);

	return matchedUserPrice;
}
