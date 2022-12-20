import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrencyIsOpen, setSelectedCurrency } from '../store/currencySlice';
import OutsideClickGuard from '../Utilities/OutsideClickGuard';

class Currency extends Component {
	//Get the value
	//render the value
	constructor() {
		super();

		this.currencyHandler = this.currencyHandler.bind(this);
	}

	//toggle currency dropdown menu on click outside
	currencyHandler() {
		this.props.setCurrencyIsOpen(!this.props.currencyIsOpen);
	}

	render() {
		let { currencyIsOpen, products } = this.props;

		const currencyState = currencyIsOpen ? 'visible' : '';
		const allProducts = products?.products?.category?.products;
		// console.log(allProducts);
		const prices = allProducts?.map((item, i) =>
			item.prices.map((item) => {
				return {
					currency: item.currency.label,
					symbol: item.currency.symbol,
				};
			})
		);
		// const prices = allProducts.map((item, i) =>
		// 	item.prices.map((item) => {
		// 		return {
		// 			currency: item.currency,
		// 			amount: item.amount,
		// 		};
		// 	})
		// );

		// console.log(prices[0].map((item) => item.symbol));
		// console.log(prices);

		return (
			<OutsideClickGuard className={`header-currency guard`}>
				<div className={`header-currency`} onClick={this.currencyHandler}>
					<div className={`header-currency__symbols`}>
						<span className="header-currency__symbols__currency-symbol">$</span>

						<span className={`header-currency__symbols__dropdown-symbol`}>
							&#8964;
						</span>
					</div>
				</div>

				<ul className={`header-currency__currency-items ${currencyState}`}>
					{prices !== undefined
						? prices[0].map((item, i) => {
								return (
									<li
										className={`header-currency__currency-items__item `}
										key={item.currency}
									>
										$ USD
										{item.symbol} {item.currency}
									</li>
								);
						  })
						: null}

					{/* <li className={`header-currency__currency-items__item `}>$ USD</li>
					<li className={`header-currency__currency-items__item `}>
						&euro;EURO
					</li>
					<li className={`header-currency__currency-items__item `}>
						&#165;JPY
					</li>
					<li className={`header-currency__currency-items__item `}>$ AUD</li>
					<li className={`header-currency__currency-items__item `}>
						&#8381; RUB
					</li> */}
				</ul>
			</OutsideClickGuard>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectedCurrency: state.currency.selectedCurrency,
		currencyIsOpen: state.currency.currencyIsOpen,
		products: state.products,
	};
};

const mapDispatchToProps = { setCurrencyIsOpen, setSelectedCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
