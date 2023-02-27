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

		// const { productID, attributes, prices } = this.props;
		// const { prices } = this.props;

		this.state = {
			// selectedTitle: productID,
			selectedValues: [],
			items: [],
			// itemPrice: prices?.amount,
			// itemPrice: null,
			itemCurrency: {},
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
		this.setState({
			// itemPrice: this.props.product?.price[0]?.amount,
			items: attributes,
			itemCurrency: itemPrice,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		const { cartItems, selectedCurrency } = this.props;
		const { prices, quantity } = this.props?.product;
		const { itemCurrency } = this.state;

		console.log('Previous Props: ', prevProps);
		console.log(this.props);

		if (prevProps.quantity !== this.props.quantity) {
			this.setState({
				// itemPrice: prices[0].amount * quantity.quantity,
				itemCurrency: this.updateItemPrice(),
			});
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
		const { itemCurrency } = this.state;
		console.log('Item price shoudl be updated');
		return itemCurrency.amount * quantity.quantity;
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

		// console.log(itemCurrency);

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
						{/* <span className="pd__price-price__symbol">{prices?.symbol}</span> */}
						{/* {miniCart && itemPrice
							? roundToTwoDecimalPlaces(itemPrice)
							: prices?.amount} */}
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
