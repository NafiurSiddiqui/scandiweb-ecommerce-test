import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cartTotalHandler } from '../../store/cartSlice';

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

	componentDidMount() {
		// this.props.cartTotalHandler(this.state.itemPrices);
		// console.log(this.state.itemPrices);
		// console.log('mounts');
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

		if (prevState.itemPrices !== this.state.itemPrices) {
			this.props.cartTotalHandler(this.state.itemPrices);
		}
	}

	render() {
		const { cartItems } = this.props;

		// console.log(this.state.itemPrices);

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

export default connect(mapStateToProps, { cartTotalHandler })(CartItems);
