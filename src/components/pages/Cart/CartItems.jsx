import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cartTaxHandler, cartTotalHandler } from '../../store/cartSlice';

import CartItem from './CartItem';

class CartItems extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemPrices: [],
		};
		this.cumulativePriceHandler = this.cumulativePriceHandler.bind(this);
	}

	//gather each cartItems price here
	cumulativePriceHandler(price, itemIndex, update = false) {
		if (update) {
			//update the changes to the right position
			this.setState((prevState) => {
				let updatedPrices = [...prevState.itemPrices];
				updatedPrices[itemIndex] = price;
				return {
					itemPrices: updatedPrices,
				};
			});

			return;
		}
		//set the prices
		this.setState((prevState) => ({
			itemPrices: [...prevState.itemPrices, price],
		}));
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.itemPrices !== this.state.itemPrices) {
			this.props.cartTotalHandler(this.state.itemPrices);
			this.props.cartTaxHandler();
		}

		if (prevProps.cartItems.length !== this.props.cartItems.length) {
			//removes the item price
			let removedItemIndex = prevProps.cartItems.findIndex(
				(item) => !this.props.cartItems.includes(item)
			);
			let newItemPrices = [...this.state.itemPrices];
			newItemPrices.splice(removedItemIndex, 1);
			this.setState({
				itemPrices: newItemPrices,
			});
			this.props.cartTotalHandler(newItemPrices);
			this.props.cartTaxHandler();
		}

		if (this.props.cartItems.length === 0) {
			this.props.cartTotalHandler(0);
			this.props.cartTaxHandler();
		}
	}

	render() {
		const { cartItems, cartPage } = this.props;

		return (
			<ul className="cart-items">
				{cartItems.map((item, i) => {
					const itemId = `${item.name}_${i + 1}`;
					return (
						<CartItem
							key={itemId}
							cartItem={item}
							cumulativePriceHandler={this.cumulativePriceHandler}
							itemIndex={i}
							cartPage={cartPage}
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

const mapDispatchToProps = {
	cartTotalHandler,
	cartTaxHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
