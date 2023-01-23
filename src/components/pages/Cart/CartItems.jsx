import React, { Component } from 'react';
import { connect } from 'react-redux';

import CartItem from './CartItem';

class CartItems extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemPrices: [],
			update: false,
		};
		this.itemPriceHandler = this.itemPriceHandler.bind(this);
		this.updateHandler = this.updateHandler.bind(this);
	}

	itemPriceHandler(price, itemIndex, update = false) {
		if (update) {
			this.setState((prevState) => {
				let updatedPrices = [...prevState.itemPrices];
				updatedPrices[itemIndex] = price;
				return {
					itemPrices: updatedPrices,
				};
			});

			return;
		}

		this.setState((prevState) => ({
			itemPrices: [...prevState.itemPrices, price],
		}));
	}

	updateHandler(value) {
		this.setState({
			update: value,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.update !== this.state.update) {
			//run totalHandler
		}
	}

	render() {
		const { cartItems } = this.props;

		return (
			<ul className="cart-items">
				{cartItems.map((item, i) => {
					return (
						<CartItem
							key={i}
							cartItem={item}
							itemPriceHandler={this.itemPriceHandler}
							updateHandler={this.updateHandler}
							itemIndex={i}
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
