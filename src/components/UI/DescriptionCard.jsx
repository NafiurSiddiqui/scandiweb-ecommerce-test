import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttributeItem from '../pages/PDP/AttributeItem';
import {
	addItemToCart,
	cartPricingHandler,
	cartQuantityHandler,
	cartTotalHandler,
} from '../store/cartSlice';
import { roundToTwoDecimalPlaces } from '../Utilities/numberRounder';
import { userCurrency } from '../Utilities/userCurrency';

import Button from './Button';

/**
 * @className : PD = product description
 */

class DescriptionCard extends Component {
	constructor() {
		super();

		this.state = {
			selectedValues: [],
			items: [],
			itemCurrency: {},
			itemPrice: 0,
		};

		this.updateItems = this.updateItems.bind(this);
		this.cartItemHandler = this.cartItemHandler.bind(this);
		this.updateItemPrice = this.updateItemPrice.bind(this);
	}

	componentDidMount() {
		const { miniCart, prices, selectedCurrency } = this.props;
		const { quantity, attributes } = this.props.product;
		// console.log(this.props.product);
		// console.log(prices);
		// console.log(selectedCurrency);
		let itemPrice = userCurrency(prices, selectedCurrency, true);
		// console.log(itemPrice);
		// this.setState({
		// 	// itemPrice: this.props.product?.price[0]?.amount,
		// 	items: attributes,
		// 	itemCurrency: itemPrice,
		// });

		this.setState({
			items: attributes,
			// itemCurrency: {
			// 	currency: itemPrice.currency,
			// 	symbol: itemPrice.symbol,
			// 	amount: itemPrice.amount * quantity.quantity,
			// },
			itemCurrency: itemPrice,
			itemPrice: itemPrice.amount,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		const { cartItems, selectedCurrency } = this.props;
		const { prices, quantity } = this.props?.product;
		const { itemCurrency } = this.state;

		// console.log('Previous Props: ', prevProps);
		// console.log(this.props);

		if (prevProps.quantity !== this.props.quantity) {
			console.log('QT changed');

			this.setState((prevState) => ({
				itemCurrency: {
					...prevState.itemCurrency,
					amount: this.updateItemPrice(),
				},
			}));
		}
		// if (prevProps.cartItems.length !== cartItems.length) {
		// 	this.setState({
		// 		// itemPrice: prices.amount, //? Why do we need this here?
		// 	});
		// }

		if (prevProps.selectedCurrency.currency !== selectedCurrency.currency) {
			console.log('currency changed, what should we do?');
		}
	}

	updateItemPrice() {
		const { quantity } = this.props?.product;
		const { itemPrice } = this.state;
		// console.log(quantity);
		// console.log(itemCurrency.amount);
		return itemPrice * quantity.quantity;
	}

	updateItems(itemIndex, btnIndex) {
		this.setState((prevState) => {
			const updatedItems = prevState.items.map((item, index) => {
				if (index === itemIndex) {
					// const updatedCheck = item[1].map((btn, isCheckIndex) => {
					// 	if (isCheckIndex === btnIndex) {
					// 		return { ...btn, isChecked: true };
					// 	} else {
					// 		return { ...btn, isChecked: false };
					// 	}
					// });
					const updatedCheck = item['values'].map((btn, isCheckIndex) => {
						if (isCheckIndex === btnIndex) {
							return { ...btn, isChecked: true };
						} else {
							return { ...btn, isChecked: false };
						}
					});

					return [item['name'], updatedCheck];
				}
				return item;
			});
			return { items: updatedItems };
		});
	}

	cartItemHandler() {
		const { items, selectedTitle } = this.state;
		const { addItemToCart } = this.props;

		//! MUST DEFINE NEW DS
		let userItems = [selectedTitle, items, { quantity: 0 }];

		const mappedItems = items.map((item) =>
			item[1].map((item) => item.isChecked)
		);
		//checks if any of the attributes has not been selected
		const itemsNotChecked = mappedItems.some((items) =>
			items.every((item) => item === false)
		);
		//alert if items are unchecked
		if (itemsNotChecked) {
			alert('Please select at least one option');
		} else {
			addItemToCart(userItems);
			this.props.cartQuantityHandler();
		}
	}

	render() {
		const { brand, name, inStock, attributes } = this.props.product;
		const { items, itemPrice, itemCurrency } = this.state;

		console.log(itemCurrency);

		const { priceHeading, className, miniCart, cartPage, prices } = this.props;

		return (
			<article
				className={className}
				style={{
					lineHeight: miniCart && !cartPage ? '1.1rem' : '1.5rem',
				}}
			>
				<div className={`${className}__headers`}>
					<h2 style={cartPage ? { fontSize: '1.5rem', fontWeight: 600 } : {}}>
						{brand}
					</h2>
					<h3 style={cartPage ? { fontSize: '1.2rem', fontWeight: 400 } : {}}>
						{name}
					</h3>
				</div>
				{items ? (
					items.map((item, itemIndex) => {
						return (
							<AttributeItem
								itemIndex={itemIndex}
								attHeader={item['name']}
								attributesItem={item['values']}
								// attributes={attributes}
								key={itemIndex}
								className={className}
								updateItems={this.updateItems}
								// productID={productID}
								miniCart={miniCart}
								cartPage={cartPage}
							/>
						);
					})
				) : (
					<p>Something went wrong</p>
				)}

				<div className="pd__price">
					{priceHeading ? <h4 className="pd__price-header">PRICE:</h4> : null}
					<span
						className="pd__price-price"
						style={{ fontSize: miniCart && !cartPage ? '1rem' : '1.2rem' }}
					>
						<span className="pd__price-price__symbol">
							{itemCurrency?.symbol}
						</span>
						{miniCart && itemCurrency?.amount
							? roundToTwoDecimalPlaces(itemCurrency.amount)
							: prices?.amount}
					</span>
				</div>

				<Button
					className="pdp__cart-btn"
					disable={inStock}
					onClick={this.cartItemHandler}
					miniCart={miniCart}
				>
					ADD TO CART
				</Button>
			</article>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productID: state.products.productID,
		selectedProduct: state.products.selectedProduct,
		cartItems: state.cart.cartItems,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

const mapDispatchToProps = {
	addItemToCart,
	cartTotalHandler,
	cartPricingHandler,
	cartQuantityHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionCard);
