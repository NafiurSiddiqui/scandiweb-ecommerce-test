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
		const { prices, selectedCurrency, setItemPriceHandler, miniCart } =
			this.props;
		const { attributes } = this.props.product;

		let selectedUserCurrency = userCurrency(prices, selectedCurrency, true);

		this.setState({
			items: attributes,
			itemCurrency: selectedUserCurrency,
			itemPrice: selectedUserCurrency.amount,
		});
		//captures in the parent for accumulation for cartItems
		if (miniCart) {
			setItemPriceHandler(selectedUserCurrency.amount);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { selectedCurrency, setItemPriceHandler, miniCart } = this.props;
		const { prices } = this.props?.product;

		let selectedUserCurrency = userCurrency(prices, selectedCurrency, true);

		if (prevProps.quantity !== this.props.quantity) {
			this.setState((prevState) => ({
				itemCurrency: {
					...prevState.itemCurrency,
					amount: this.updateItemPrice(),
				},
			}));

			if (miniCart) {
				setItemPriceHandler(this.updateItemPrice());
			}
		}

		if (prevProps.selectedCurrency?.currency !== selectedCurrency?.currency) {
			this.setState({
				itemCurrency: selectedUserCurrency,
				itemPrice: selectedUserCurrency.amount,
			});
		}
	}

	updateItemPrice() {
		const { quantity } = this.props?.product;
		const { itemPrice } = this.state;

		return itemPrice * quantity.quantity;
	}

	updateItems(itemIndex, btnIndex) {
		this.setState((prevState) => {
			const updatedItems = prevState.items?.map((item, index) => {
				if (index === itemIndex) {
					const updatedCheck = item?.values.map((btn, isCheckIndex) => {
						if (isCheckIndex === btnIndex) {
							return { ...btn, isChecked: true };
						} else {
							return { ...btn, isChecked: false };
						}
					});

					return { name: item.name, values: updatedCheck };
				}
				return item;
			});
			return { items: updatedItems };
		});
	}

	cartItemHandler() {
		const { items, selectedTitle } = this.state;
		const { addItemToCart, product, cartQuantityHandler } = this.props;

		//gets the new & updated attributes
		product.attributes = items;
		//to make an array for store
		let userCartItem = [product];

		addItemToCart(userCartItem);
		cartQuantityHandler();
	}

	render() {
		const { brand, name, inStock } = this.props.product;
		const { items, itemPrice, itemCurrency } = this.state;

		const { priceHeading, className, miniCart, cartPage } = this.props;

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
								attHeader={item?.name}
								attributesItem={item?.values}
								key={itemIndex}
								className={className}
								updateItems={this.updateItems}
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
							: itemPrice}
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
