import React, { Component } from 'react';
import CartItems from './CartItems';
import CartPricing from './CartPricing';

export default class CartContainer extends Component {
	render() {
		const { className } = this.props;

		return (
			<article className={className}>
				<CartItems />
				<CartPricing className={'cart-page'} />
			</article>
		);
	}
}
