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
		this.itemPriceHandler = this.itemPriceHandler.bind(this);
	}

	itemPriceHandler(price) {
		this.setState((prevState) => ({
			itemPrices: [...prevState.itemPrices, price],
		}));
	}

	componentDidUpdate(prevState) {
		// if (prevProps.cartItems !== this.props.cartItems) {
		// 	this.setState({ itemPrices: [] }, () => {
		// 		this.props.cartItems.forEach((cartItem) => {
		// 			this.itemPriceHandler(cartItem.itemPrice);
		// 			console.log(cartItem);
		// 		});
		// 	});
		// }

		console.log(prevState);

		// if (prevState.itemPrices !== this.state.itemPrices) {
		// 	console.log('Not the same!');
		// }
	}

	render() {
		const { cartItems } = this.props;

		console.log(this.state.itemPrices);

		return (
			<ul className="cart-items">
				{cartItems.map((item, i) => {
					return (
						<CartItem
							key={i}
							cartItem={item}
							itemPriceHandler={this.itemPriceHandler}
						/>
					);
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
