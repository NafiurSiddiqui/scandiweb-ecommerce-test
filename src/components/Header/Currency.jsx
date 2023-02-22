import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrencyIsOpen, setSelectedCurrency } from '../store/currencySlice';
import { CurrencyListWithData } from '../Utilities/CurrencyList';

class Currency extends Component {
	render() {
		let {
			currencyIsOpen,
			selectedCurrency,
			setCurrencyIsOpen,
			setSelectedCurrency,
		} = this.props;

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
