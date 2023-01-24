import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cartTotalHandler } from '../../store/cartSlice';

import CartItem from './CartItem';

class CartItems extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemPrices: [],
		};
		this.itemPriceHandler = this.itemPriceHandler.bind(this);
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

	componentDidUpdate(prevProps, prevState) {
		if (prevState.itemPrices !== this.state.itemPrices) {
			// console.log('should update');
			this.props.cartTotalHandler(this.state.itemPrices);
		}

		if (prevProps.cartItems.length !== this.props.cartItems.length) {
			let newItemPrices = this.state.itemPrices.filter((price, index) => {
				if (this.props.cartItems[index] === undefined) {
					return -1;
				} else {
					return (
						prevProps.cartItems.findIndex(
							(item) => item[0] === this.props.cartItems[index]
						) !== -1
					);
				}
			});

			this.setState({
				itemPrices: newItemPrices,
			});
			this.props.cartTotalHandler(newItemPrices);
		}

		if (this.props.cartItems.length === 0) {
			this.props.cartTotalHandler(0);
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

export default connect(mapStateToProps, { cartTotalHandler })(CartItems);
