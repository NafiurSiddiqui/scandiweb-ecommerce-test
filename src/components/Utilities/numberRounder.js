export const roundToTwoDecimalPlaces = (n) => {
	let decimalTotal = n.toFixed(2);
	let [integerPart, decimalPart] = decimalTotal.split('.');
	let roundedTotal = `${integerPart}.${decimalPart}`;
	console.log(typeof roundedTotal);
	console.log(roundedTotal);
	return roundedTotal;
};
