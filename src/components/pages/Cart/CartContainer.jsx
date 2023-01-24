import React, { Component } from 'react';
import CartItems from './CartItems';
import CartPricing from './CartPricing';
import MiniCartPricing from './MiniCartPricing';

export default class CartContainer extends Component {
	render() {
		const { className, miniCart } = this.props;

		return (
			<article className={className}>
				<CartItems className={miniCart ? 'cart-items-mini' : 'cart-items'} />
				{miniCart ? (
					<MiniCartPricing className={'cart-page'} />
				) : (
					<CartPricing className={'cart-page'} />
				)}
			</article>
		);
	}
}
