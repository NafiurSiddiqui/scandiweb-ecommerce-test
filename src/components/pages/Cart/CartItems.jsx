import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../../store/productsSlice';
import { mapStateToProps } from '../Category/All';
import CartItem from './CartItem';

class CartItems extends Component {
	render() {
		const { products, selectedProduct } = this.props;

		//test

		const cartItems = ['a', 'b', 'c'];
		//---

		return (
			<ul className="cart-items">
				{cartItems.map((item) => {
					return <CartItem key={item} />;
				})}
				{/* <CartItem /> */}
			</ul>
		);
	}
}

export default connect(mapStateToProps)(CartItems);
