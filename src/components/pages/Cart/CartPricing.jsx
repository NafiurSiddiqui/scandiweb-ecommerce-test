import React, { Component } from 'react';
import Button from '../../UI/Button';

export default class CartPricing extends Component {
	render() {
		const { miniCart, className } = this.props;
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
					<span className={`${className} price-info__amount`}>$200</span>
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
