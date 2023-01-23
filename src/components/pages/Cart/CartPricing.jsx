import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../UI/Button';

class CartPricing extends Component {
	render() {
		const { miniCart, className, cartTotal, currencySymbol } = this.props;

		return (
			<section className={className}>
				{miniCart ? (
					<span
						className={`cartPage-tax-info`}
						role={miniCart ? 'contentinfo' : ''}
					></span>
				) : null}
				{miniCart ? (
					<span
						className={`cartPage-quantity-info`}
						role={miniCart ? 'contentinfo' : ''}
					></span>
				) : null}
				<div className={`${className} price-info`} role="contentinfo">
					<span className={`${className} price-info__total`}>Total</span>
					<span className={`${className} price-info__amount`}>
						{currencySymbol}
						{cartTotal}
					</span>
				</div>

				<div className="cart-btns">
					{miniCart ? (
						<Button className="cart-btns__btn view-bag">VIEW BAG </Button>
					) : null}
					<Button className={`cart-btns__btn ${className} `}>CHECKOUT</Button>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	cartTotal: state.cart.cartTotal,
	currencySymbol: state.currency.selectedCurrency.symbol,
});

export default connect(mapStateToProps)(CartPricing);
