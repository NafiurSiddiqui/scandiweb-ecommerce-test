import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * @cartTotal - integer
 * @currencySymbol - string
 */

class MiniCartPricing extends Component {
	render() {
		const { className, cartTotal, currencySymbol } = this.props;

		return (
			<section className={`${className} price-wrapper`}>
				<div className={`${className} price-info`} role="contentinfo">
					<span className={`${className} price-info__total`}>Total</span>
					<span className={`${className} price-info__amount`}>
						{currencySymbol ? currencySymbol : '$'}
						{cartTotal}
					</span>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	cartTotal: state.cart.cartTotal,
	currencySymbol: state.currency.selectedCurrency?.symbol,
});

export default connect(mapStateToProps)(MiniCartPricing);
