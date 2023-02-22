import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrencyIsOpen, setSelectedCurrency } from '../store/currencySlice';
import CurrencyQuery from './CustomQurey';
import OutsideClickGuard from './OutsideClickGuard';
import { GET_CURRENCIES } from './query';

class CurrencyList extends Component {
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

		this.currencyHandler();
	}

	render() {
		let { currencyIsOpen, selectedCurrency, data } = this.props;
		const currencyState = currencyIsOpen ? 'visible' : '';

		const currencies = data.currencies;
		return (
			<OutsideClickGuard className={`header-currency guard`}>
				<div className={`header-currency`} onClick={this.currencyHandler}>
					<div className={`header-currency__symbols`}>
						<span className="header-currency__symbols__currency-symbol">
							{selectedCurrency !== (null || undefined)
								? selectedCurrency.symbol
								: '$'}
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
					{currencies.map((item, index) => {
						return (
							<li
								className={`header-currency__currency-items__item ${
									this.state.currencyActive === index ? 'currencyActive' : ''
								} `}
								key={item.label}
								onClick={(e) => this.selectedCurrencyHandler(e, index)}
							>
								<span className="header-currency__currency-items__item-symbol">
									{item.symbol}
								</span>
								{item.label}
							</li>
						);
					})}
				</ul>
			</OutsideClickGuard>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectedCurrency: state.currency.selectedCurrency,
		currencyIsOpen: state.currency.currencyIsOpen,
	};
};

const mapDispatchToProps = { setCurrencyIsOpen, setSelectedCurrency };

export const CurrencyListWithData = CurrencyQuery(
	CurrencyList,
	GET_CURRENCIES,
	mapDispatchToProps
);

//HOC implementation
CurrencyList = connect(mapStateToProps, mapDispatchToProps)(CurrencyList);
