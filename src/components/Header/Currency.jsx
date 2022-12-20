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
		this.selectedCurrencyHandler = this.selectedCurrencyHandler.bind(this);
	}

	//toggle currency dropdown menu on click outside
	currencyHandler() {
		this.props.setCurrencyIsOpen(!this.props.currencyIsOpen);
	}

	//get & gloablly set the value
	selectedCurrencyHandler(e) {
		this.props.setSelectedCurrency(e.target.textContent);
		// console.log(e.target.textContent);
	}

	render() {
		let { currencyIsOpen, products, selectedCurrency } = this.props;
		const currencyState = currencyIsOpen ? 'visible' : '';
		const allProducts = products?.products?.category?.products;
		const prices = allProducts?.map((item, i) =>
			item.prices.map((item) => {
				return {
					currency: item.currency.label,
					symbol: item.currency.symbol,
				};
			})
		);

		return (
			<OutsideClickGuard className={`header-currency guard`}>
				<div className={`header-currency`} onClick={this.currencyHandler}>
					<div className={`header-currency__symbols`}>
						<span className="header-currency__symbols__currency-symbol">
							{selectedCurrency[0]}
						</span>

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
										onClick={this.selectedCurrencyHandler}
									>
										{item.symbol} {item.currency}
									</li>
								);
						  })
						: null}
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
