import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrencyIsOpen, setSelectedCurrency } from '../store/currencySlice';
import OutsideClickGuard from '../Utilities/OutsideClickGuard';

/**
 * @selectedCurrency -[0]: to extract the symbol only.
 */

class Currency extends Component {
	constructor() {
		super();

		this.state = {
			currencyActive: null,
		};

		this.currencyHandler = this.currencyHandler.bind(this);
		this.selectedCurrencyHandler = this.selectedCurrencyHandler.bind(this);
	}

	//toggle currency dropdown menu on click outside
	currencyHandler() {
		this.props.setCurrencyIsOpen(!this.props.currencyIsOpen);
	}

	//get & gloablly set the value
	selectedCurrencyHandler(e, index) {
		this.props.setSelectedCurrency({
			currency: e.target.lastChild.nodeValue,
			symbol: e.target.firstChild.innerText,
		});

		this.setState({
			currencyActive: index,
		});
	}

	render() {
		let { currencyIsOpen, products, selectedCurrency } = this.props;
		const currencyState = currencyIsOpen ? 'visible' : '';
		const allProducts = products?.products;

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
							{selectedCurrency !== null ? selectedCurrency.symbol : '$'}
						</span>

						<span
							className={`header-currency__symbols__dropdown-symbol ${
								currencyIsOpen ? 'currencyOpen' : ''
							}`}
						>
							&#8964;
						</span>
					</div>
				</div>

				<ul className={`header-currency__currency-items ${currencyState}`}>
					{prices !== undefined
						? prices[0].map((item, index) => {
								return (
									<li
										className={`header-currency__currency-items__item ${
											this.state.currencyActive === index
												? 'currencyActive'
												: ''
										} `}
										key={item.currency}
										onClick={(e) => this.selectedCurrencyHandler(e, index)}
									>
										<span className="header-currency__currency-items__item-symbol">
											{item.symbol}
										</span>
										{item.currency}
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
