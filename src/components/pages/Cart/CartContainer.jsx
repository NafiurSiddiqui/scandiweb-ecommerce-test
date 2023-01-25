import React, { Component } from 'react';
import CartItems from './CartItems';
import CartPricing from './CartPricing';
import MiniCartPricing from './MiniCartPricing';

export default class CartContainer extends Component {
	render() {
		const { className, miniCart, cartPage } = this.props;

		return (
			<article className={className}>
				<CartItems cartPage={cartPage} />
				{miniCart ? (
					<MiniCartPricing
						className={'mini-cart__pricing'}
						cartPage={cartPage}
					/>
				) : (
					<CartPricing className={'cart-page__pricing'} />
				)}
			</article>
		);
	}
}
