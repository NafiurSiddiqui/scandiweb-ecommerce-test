import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBodyIsClicked } from '../store/currencySlice';

class Currency extends Component {
	//Get the value
	//render the value
	//toggle currency dropdown menu on click outside
	constructor() {
		super();
		this.state = {
			currencyIsOpen: false,
		};

		this.currencyHandler = this.currencyHandler.bind(this);
	}

	currencyHandler() {
		// if (this.props.bodyIsClicked) {

		// }

		// this.props.setBodyIsClicked(false);

		this.setState((prev) => ({
			currencyIsOpen: !prev.currencyIsOpen,
		}));
	}

	render() {
		let { bodyIsClicked } = this.props;
		const currencyState = this.state.currencyIsOpen ? 'visible' : '';
		console.log(bodyIsClicked);

		return (
			<>
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
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		bodyIsClicked: state.currency.bodyIsClicked,
	};
};

const mapDispatchToProps = { setBodyIsClicked };

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
