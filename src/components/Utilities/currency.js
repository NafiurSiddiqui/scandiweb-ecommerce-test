export function userCurrency(products, selectedCurrency, singleItem = false) {
	let currencies;
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
			currencies.find((el) => el.currency === selectedCurrency.currency)
		);

		// const matchedUserPrice = currencies?.map(
		// 	(item) => {
		// 		return {
		// 			currency: selectedCurrency
		// 				? selectedCurrency.currency
		// 				: item.currency,

		// 		};
		// 	}

		// 	// item.find((el) => {
		// 	// 	if (selectedCurrency !== null) {
		// 	// 		return el.currency === selectedCurrency.currency;
		// 	// 	} else {
		// 	// 		return el.currency === 'USD';
		// 	// 	}
		// 	// })
		// );

		// console.log(matchedUserPrice);

		console.log(selectedCurrency);
	}

	// console.log(currencies);

	// //ensure user's currency selection
	// const matchedUserPrice = currencies?.map((item) =>
	// 	item.find((el) => {
	// 		if (selectedCurrency !== null) {
	// 			return el.currency === selectedCurrency.currency;
	// 		} else {
	// 			return el.currency === 'USD';
	// 		}
	// 	})
	// );

	// console.log(matchedUserPrice);

	// // const matchedUserPrice = 'DELETE THIS';

	// return matchedUserPrice;
}
