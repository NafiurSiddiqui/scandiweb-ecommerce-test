import React, { Component } from 'react';
import CartItems from './CartItems';
import CartPricing from './CartPricing';

export default class CartContainer extends Component {
	render() {
		return (
			<article className={this.props.className}>
				<CartItems />
				<CartPricing miniCart={true} className={'cart-page'} />
			</article>
		);
	}
}
