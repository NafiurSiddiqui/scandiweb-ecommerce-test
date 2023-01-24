import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttributeItem from '../pages/PDP/AttributeItem';
import {
	addItemToCart,
	cartPricingHandler,
	cartTotalHandler,
} from '../store/cartSlice';

import Button from './Button';

/**
 * @className : PD = product description
 */
class DescriptionCard extends Component {
	constructor(props) {
		super(props);

		const { productID } = this.props;
		const { prices } = this.props.products;

		this.state = {
			selectedTitle: productID,
			selectedValues: [],
			items: [],
			itemCalculation: prices[0]?.amount,
		};
		this.getSelectedValues = this.getSelectedValues.bind(this);
		this.updateItems = this.updateItems.bind(this);
		this.cartItemHandler = this.cartItemHandler.bind(this);
	}

	componentDidMount() {
		const { attributes, miniCart, quantity } = this.props;
		const { prices } = this.props.products;

		if (miniCart && attributes) {
			const attHeaders = attributes[1].map((item) => item.name);
			const attItems = attributes[1].map((item) => item.values);

			const selectedAttributes = attHeaders.reduce((acc, key, index) => {
				acc[key] = attItems[index];
				return acc;
			}, {});

			this.setState({
				items: Object.entries(selectedAttributes),
				itemCalculation: prices[0].amount * quantity,
			});

			return;
		}

		if (attributes) {
			this.setState({
				items: Object.entries(attributes),
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { quantity, cartItems } = this.props;
		const { prices } = this.props.products;

		if (prevProps.quantity !== quantity) {
			this.setState({
				itemCalculation: prices[0].amount * quantity,
			});
		}

		if (prevProps.cartItems.length !== cartItems.length) {
			this.setState({
				itemCalculation: prices[0].amount,
			});
		}
	}

	getSelectedValues(id, itemValues) {
		this.setState((prevState) => {
			//find the index of the item with matching ID
			const index = prevState.selectedValues.findIndex(
				(item) => item.id === id
			);

			//if the id is found, update the itemValues

			if (index !== -1) {
				prevState.selectedValues[index].itemValues = itemValues;
			} else {
				prevState.selectedValues.push({ id, itemValues });
			}

			return { itemValues: prevState.itemValues };
		});
	}

	updateItems(itemIndex, btnIndex) {
		this.setState((prevState) => {
			const updatedItems = prevState.items.map((item, index) => {
				if (index === itemIndex) {
					const updatedCheck = item[1].map((btn, isCheckIndex) => {
						if (isCheckIndex === btnIndex) {
							return { ...btn, isChecked: !btn.isChecked };
						}

						return btn;
					});

					return [item[0], updatedCheck];
				}
				return item;
			});
			return { items: updatedItems };
		});
	}

	cartItemHandler() {
		const { items, selectedTitle } = this.state;
		const { addItemToCart } = this.props;

		// console.log(items);

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
			alert('Please select at lease one option');
		} else {
			addItemToCart(userItems);
		}
	}

	render() {
		const { brand, name, prices, stock } = this.props.products;
		const { items, itemCalculation } = this.state;

		const {
			priceHeading,
			className,
			miniCart,
			productID,
			attributes,
			cartPage,
		} = this.props;

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
								attHeader={item[0]}
								attributesItem={item[1]}
								attributes={attributes}
								key={itemIndex}
								className={className}
								getSelectedValues={this.getSelectedValues}
								updateItems={this.updateItems}
								productID={productID}
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
						style={{ fontSize: miniCart ? '1rem' : '' }}
					>
						<span className="pd__price-price__symbol">
							{prices[0]?.currency?.symbol}
						</span>
						{miniCart ? itemCalculation : prices[0]?.amount}
					</span>
				</div>

				<Button
					className="pdp__cart-btn"
					disable={stock}
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
	};
};

export default connect(mapStateToProps, {
	addItemToCart,
	cartTotalHandler,
	cartPricingHandler,
})(DescriptionCard);
