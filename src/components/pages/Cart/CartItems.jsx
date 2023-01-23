import React, { Component } from 'react';
import { connect } from 'react-redux';

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

	componentDidUpdate(prevState, prevProps) {}

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
