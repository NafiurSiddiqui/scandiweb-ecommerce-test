import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button';

class CartPricing extends Component {
	render() {
		const { miniCartIsOpen, className, cartTotal, currencySymbol, miniCart } =
			this.props;

		console.log(miniCartIsOpen);

		return (
			<section className={className}>
				{miniCartIsOpen ? (
					<span
						className={`cartPage-tax-info`}
						role={miniCartIsOpen ? 'contentinfo' : ''}
					></span>
				) : null}
				{miniCartIsOpen ? (
					<span
						className={`cartPage-quantity-info`}
						role={miniCartIsOpen ? 'contentinfo' : ''}
					></span>
				) : null}
				<div className={`${className} price-info`} role="contentinfo">
					<span className={`${className} price-info__total`}>Total</span>
					<span className={`${className} price-info__amount`}>
						{currencySymbol ? currencySymbol : '$'}
						{cartTotal}
					</span>
				</div>

				<div className="cart-btns">
					{miniCartIsOpen ? (
						<Button className="cart-btns__btn view-bag">
							<Link to="Cart">VIEW BAG</Link>
						</Button>
					) : null}
					<Button className={`cart-btns__btn ${className} `}>CHECKOUT</Button>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	cartTotal: state.cart.cartTotal,
	currencySymbol: state.currency.selectedCurrency?.symbol,
	miniCartIsOpen: state.cart.miniCartIsOpen,
});

export default connect(mapStateToProps)(CartPricing);
