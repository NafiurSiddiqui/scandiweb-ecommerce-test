export const roundToTwoDecimalPlaces = (n) => {
	let decimalTotal = n.toFixed(2);
	// let [integerPart, decimalPart] = decimalTotal.split('.');
	// let roundedTotal = `${integerPart}.${decimalPart}`;
	// return roundedTotal;
	return decimalTotal;
};
