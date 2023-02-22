import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import { setCurrencyIsOpen, setSelectedCurrency } from '../store/currencySlice';
import OutsideClickGuard from '../Utilities/OutsideClickGuard';
import { GET_CURRENCIES } from '../Utilities/query';
import DisplayMessage from '../Utilities/DisplayMessage';
import Skeleton from '../Layout/skeleton';
import customQuery from '../Utilities/CustomQurey';
import { CurrencyListWithData } from '../Utilities/CurrencyList';

class Currency extends Component {
	// constructor() {
	// 	super();

	// 	this.state = {
	// 		currencyActive: null,
	// 	};

	// 	this.currencyHandler = this.currencyHandler.bind(this);
	// 	this.selectedCurrencyHandler = this.selectedCurrencyHandler.bind(this);
	// }

	// //toggle currency dropdown menu on click outside
	// currencyHandler() {
	// 	this.props.setCurrencyIsOpen(!this.props.currencyIsOpen);
	// }

	// //get & gloablly set the value
	// selectedCurrencyHandler(e, index) {
	// 	this.props.setSelectedCurrency({
	// 		currency: e.target.lastChild.nodeValue,
	// 		symbol: e.target.firstChild.innerText,
	// 	});

	// 	this.setState({
	// 		currencyActive: index,
	// 	});

	// 	this.currencyHandler();
	// }

	render() {
		// let {
		// 	currencyIsOpen,
		// 	selectedCurrency,
		// 	setCurrencyIsOpen,
		// 	setSelectedCurrency,
		// } = this.props;
		// const currencyState = currencyIsOpen ? 'visible' : '';

		let {
			currencyIsOpen,
			selectedCurrency,
			setCurrencyIsOpen,
			setSelectedCurrency,
		} = this.props;

		//! Send currency request from here.

		return (
			<CurrencyListWithData
				currencyIsOpen={currencyIsOpen}
				selectedCurrency={selectedCurrency}
				setCurrencyIsOpen={setCurrencyIsOpen}
				setSelectedCurrency={setSelectedCurrency}
			/>
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
