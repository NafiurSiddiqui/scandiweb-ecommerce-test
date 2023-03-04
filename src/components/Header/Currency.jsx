import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownArrow from '../assets/DownArrow';
import Skeleton from '../Layout/skeleton';
import { setCurrencyIsOpen, setSelectedCurrency } from '../store/currencySlice';
import DisplayMessage from '../Utilities/DisplayMessage';
import OutsideClickGuard from '../Utilities/OutsideClickGuard';
import { GET_CURRENCIES } from '../Utilities/query';
import { userCurrency } from '../Utilities/userCurrency';

class Currency extends Component {
	constructor() {
		super();

		this.state = {
			currencyActive: null,
			selectedCurrency: {},
		};

		this.currencyStateHandler = this.currencyStateHandler.bind(this);
		this.selectedCurrencyHandler = this.selectedCurrencyHandler.bind(this);
	}

	//toggle currency dropdown menu on click outside
	currencyStateHandler() {
		this.props.setCurrencyIsOpen(!this.props.currencyIsOpen);
	}

	//get & gloablly set the values
	selectedCurrencyHandler(e, index) {
		this.props.setSelectedCurrency({
			currency: e.target.lastChild.nodeValue,
			symbol: e.target.firstChild.innerText,
		});

		this.setState({
			currencyActive: index,
		});

		this.currencyStateHandler();
	}

	render() {
		let { currencyIsOpen, selectedCurrency } = this.props;

		const currencyState = currencyIsOpen ? 'visible' : '';

		return (
			<Query query={GET_CURRENCIES}>
				{({ error, loading, data }) => {
					if (error) return <DisplayMessage error={error} />;
					if (loading || !data) return <Skeleton />;
					const currencies = data.currencies;

					return (
						<OutsideClickGuard className={`header-currency guard`}>
							<div
								className={`header-currency`}
								onClick={this.currencyStateHandler}
							>
								<div className={`header-currency__symbols`}>
									<span className="header-currency__symbols__currency-symbol">
										{selectedCurrency !== null ? selectedCurrency?.symbol : '$'}
									</span>

									{/* <span
										className={`header-currency__symbols__dropdown-symbol ${
											currencyIsOpen ? 'currencyOpen' : ''
										}`}
									> */}
									{/* &#8964; */}
									{/* </span> */}

									<DownArrow />
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
