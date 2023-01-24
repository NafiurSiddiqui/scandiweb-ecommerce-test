import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMiniCartIsOpen } from '../../store/cartSlice';
import Button from '../../UI/Button';

class CartPricing extends Component {
	render() {
		const { className, cartTotal, currencySymbol } = this.props;

		return (
			<section className={`${className} price-wrapper`}>
				<div className={`cartPage-tax-info`} role={'contentinfo'}>
					TAX 21%:
					<span className="cartPage-tax-info-amount">
						{currencySymbol ? currencySymbol : '$'} 42
					</span>
				</div>

				<div className={`cartPage-quantity-info`} role={'contentinfo'}>
					Quantity:
					<span className="cartPage-quantity-info-amount"> 3</span>
				</div>

				<div className={`${className} price-info`} role="contentinfo">
					<span className={`${className} price-info__total`}>Total</span>
					<span className={`${className} price-info__amount`}>
						{currencySymbol ? currencySymbol : '$'}
						{cartTotal}
					</span>
				</div>

				<div className="cart-btns">
					<Button className={`cart-btns__btn ${className} `}>ORDER</Button>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	cartTotal: state.cart.cartTotal,
	currencySymbol: state.currency.selectedCurrency?.symbol,
});

export default connect(mapStateToProps, { setMiniCartIsOpen })(CartPricing);
