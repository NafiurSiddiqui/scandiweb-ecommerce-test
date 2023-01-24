import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setMiniCartIsOpen } from '../../store/cartSlice';
import Button from '../../UI/Button';

class MiniCartPricing extends Component {
	render() {
		const { className, cartTotal, currencySymbol, setMiniCartIsOpen } =
			this.props;

		return (
			<section className={className}>
				<div className={`${className} price-info`} role="contentinfo">
					<span className={`${className} price-info__total`}>Total</span>
					<span className={`${className} price-info__amount`}>
						{currencySymbol ? currencySymbol : '$'}
						{cartTotal}
					</span>
				</div>

				<div className="cart-btns">
					<Link
						to="Cart"
						className="cart-btns__btn view-bag"
						onClick={() => setMiniCartIsOpen(false)}
					>
						VIEW BAG
					</Link>

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

export default connect(mapStateToProps, { setMiniCartIsOpen })(MiniCartPricing);
