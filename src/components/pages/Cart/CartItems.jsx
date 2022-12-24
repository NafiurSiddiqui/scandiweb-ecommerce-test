import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../../store/productsSlice';
import { HOCState, mapStateToProps } from '../Category/All';
import CartItem from './CartItem';

class CartItems extends Component {
	render() {
		const { products, selectedProduct } = this.props;
		return (
			<ul className="cart-items">
				{/* {selectedItems.map((item) => {
					return <CartItem />;
				})} */}
				<CartItem />
			</ul>
		);
	}
}

export default connect(mapStateToProps)(CartItems);
