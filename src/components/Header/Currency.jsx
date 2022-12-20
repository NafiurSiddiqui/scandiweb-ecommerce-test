import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrencyIsOpen } from '../store/currencySlice';
import OutsideClickGuard from '../Utilities/OutsideClickGuard';

class Currency extends Component {
	//Get the value
	//render the value
	//toggle currency dropdown menu on click outside
	constructor() {
		super();

		this.currencyHandler = this.currencyHandler.bind(this);
	}

	currencyHandler() {
		this.props.setCurrencyIsOpen(true);
	}

	render() {
		let { currencyIsOpen } = this.props;

		const currencyState = currencyIsOpen ? 'visible' : '';

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
					<li className={`header-currency__currency-items__item `}>$ USD</li>
					<li className={`header-currency__currency-items__item `}>
						&euro;EURO
					</li>
					<li className={`header-currency__currency-items__item `}>
						&#165;JPY
					</li>
					<li className={`header-currency__currency-items__item `}>$ AUD</li>
					<li className={`header-currency__currency-items__item `}>
						&#8381; RUB
					</li>
				</ul>
			</OutsideClickGuard>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		bodyIsClicked: state.currency.bodyIsClicked,
		currencyIsOpen: state.currency.currencyIsOpen,
	};
};

const mapDispatchToProps = { setCurrencyIsOpen };

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
