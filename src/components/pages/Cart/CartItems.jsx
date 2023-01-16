import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';

class CartItems extends Component {
	render() {
		const { products, cartItems } = this.props;

		// console.log(cartItems);

		// const cartItems = ['a', 'b', 'c'];
		//---

		return (
			<ul className="cart-items">
				{cartItems.map((item) => {
					console.log(item);
					return <CartItem key={item[0]} cartItem={item} />;
				})}
			</ul>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartItems: state.cart.cartItems,
	};
};

export default connect(mapStateToProps)(CartItems);
