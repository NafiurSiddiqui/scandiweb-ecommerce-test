import React, { Component } from 'react';
import Button from '../../UI/Button';

export default class CartPricing extends Component {
	render() {
		const { miniCart } = this.props;
		return (
			<section className={this.props.className}>
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
				<div
					className={`${this.props.className} price-info`}
					role="contentinfo"
				>
					<span className="price-info__total">Total</span>
					<span className="price-info__amount">$200</span>
				</div>

				<div className="cart-btns">
					{miniCart ? (
						<Button className="cart-btns__btn view-bag">View Bag </Button>
					) : null}
					<Button className={`cart-btns__btn ${this.props.className} `}>
						Checkout
					</Button>
				</div>
			</section>
		);
	}
}
