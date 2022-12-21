import React, { Component } from 'react';
import CartItem from './CartItem';

export default class CartItems extends Component {
	render() {
		const { selectedItems } = this.props;
		return (
			<ul className="cart-items">
				{selectedItems.map((item) => {
					return <CartItem />;
				})}
			</ul>
		);
	}
}
