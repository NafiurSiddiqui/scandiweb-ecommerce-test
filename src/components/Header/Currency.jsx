import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Skeleton from '../Layout/skeleton';
import { setCurrencyIsOpen, setSelectedCurrency } from '../store/currencySlice';
import { CurrencyListWithData } from '../Utilities/CurrencyList';
import DisplayMessage from '../Utilities/DisplayMessage';
import OutsideClickGuard from '../Utilities/OutsideClickGuard';
import { GET_CURRENCIES } from '../Utilities/query';

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

		this.currencyHandler();
	}

	render() {
		let {
			currencyIsOpen,
			selectedCurrency,
			setCurrencyIsOpen,
			setSelectedCurrency,
		} = this.props;

		const currencyState = currencyIsOpen ? 'visible' : '';
		// console.log(this.props[0].setCurrencyIsOpen);

		return (
			// <CurrencyListWithData
			// 	currencyIsOpen={currencyIsOpen}
			// 	selectedCurrency={selectedCurrency}
			// 	setCurrencyIsOpen={setCurrencyIsOpen}
			// 	setSelectedCurrency={setSelectedCurrency}
			// />

			<Query query={GET_CURRENCIES}>
				{({ error, loading, data }) => {
					if (error) return <DisplayMessage error={error} />;
					if (loading || !data) return <Skeleton />;
					const currencies = data.currencies;

					return (
						<OutsideClickGuard className={`header-currency guard`}>
							<div className={`header-currency`} onClick={this.currencyHandler}>
								<div className={`header-currency__symbols`}>
									<span className="header-currency__symbols__currency-symbol">
										{selectedCurrency !== (null || undefined)
											? selectedCurrency?.symbol
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
							<ul
								className={`header-currency__currency-items ${currencyState}`}
							>
								{currencies.map((item, index) => {
									return (
										<li
											className={`header-currency__currency-items__item ${
												this.state.currencyActive === index
													? 'currencyActive'
													: ''
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
				}}
			</Query>
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

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
