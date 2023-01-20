import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cartTotalHandler } from '../../store/cartSlice';
import getPricing from '../../Utilities/cartHandler';
import CartItem from './CartItem';
class CartItems extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemPrices: [],
		};
	}

	componentDidMount() {
		// this.setState({
		// 	itemPrices: this.state.itemPrices.push(getPricing()),
		// });
		cartTotalHandler();
	}

	render() {
		const { cartItems } = this.props;

		// console.log(this.state.itemPrices);

		return (
			<ul className="cart-items">
				{cartItems.map((item, i) => {
					return <CartItem key={i} cartItem={item} />;
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
