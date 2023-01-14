import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttributeItem from '../pages/PDP/AttributeItem';
import { addItemToCart } from '../store/cartSlice';
import Button from './Button';

/**
 * @className : PD = product description
 */

class DescriptionCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTitle: this.props.products.name,
			selectedValues: [],
			items: [],
		};
		this.getSelectedValues = this.getSelectedValues.bind(this);
		this.updateItems = this.updateItems.bind(this);
		this.cartItemHandler = this.cartItemHandler.bind(this);
	}

	componentDidMount() {
		const { attributes } = this.props;

		// console.log('Does it?');

		if (attributes) {
			this.setState({
				items: Object.entries(attributes),
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
		const { addItemToCart, cartItems } = this.props;

		//find the cart item
		const itemIndex = cartItems?.findIndex((item) => item[0] === selectedTitle);

		// console.log(itemIndex);
		let userItems = [selectedTitle, items];

		// // addItemToCart(userItems);
		// if (itemIndex !== -1) {
		// 	const existingItem = cartItems[itemIndex];

		// 	// console.log(...existingItem[1].slice(0, itemIndex));
		// 	let itemIsChecked;
		// 	let cartItemIsChecked;

		// 	for (let i = 0; i < existingItem[1].length; i++) {
		// 		itemIsChecked = userItems[1][i][1].map((item) => item.isChecked);
		// 		cartItemIsChecked = existingItem[1][i][1].map((item) => item.isChecked);
		// 		let itemValue = existingItem[1][i][1].map((item) => item.value);
		// 	}

		// 	//if item does not match
		// 	const itemCheck = itemIsChecked.every(
		// 		(val, i) => val === cartItemIsChecked[i]
		// 	);

		// 	if (!itemCheck) {
		// 		//remove the index of the existing item
		// 		// userItems = [...cartItems.splice(itemIndex, itemIndex + 1)];
		// 		//push the new userItems
		// 	}

		// 	// for (let i = 0; i < existingItem[1].length; i++) {
		// 	// 	let nestedIndex = -1;
		// 	// 	let flag = false;
		// 	// 	// console.log(...existingItem[1].slice(nestedIndex + 1));
		// 	// 	// console.log(existingItem[1][i][1].map((item) => item.value));
		// 	// 	// console.log(userItems[1][i][1].map((userVal) => userVal.value));
		// 	// 	let itemIsChecked = userItems[1][i][1].map((item) => item.isChecked);
		// 	// 	let itemValue = existingItem[1][i][1].map((item) => item.value);
		// 	// 	let updatedValues = existingItem[1][i][1].map((val, index) => {
		// 	// 		// console.log(itemValue[index]);
		// 	// 		// console.log(itemIsChecked[index]);

		// 	// 		// console.log(val.isChecked === itemIsChecked[index]);

		// 	// 		if (val.value === itemValue[index]) {
		// 	// 			flag = true;
		// 	// 			console.log('Val === same');
		// 	// 			nestedIndex = i;
		// 	// 			return { ...val, isChecked: itemIsChecked[index] };
		// 	// 		}
		// 	// 		return val;
		// 	// 	});
		// 	// 	if (flag) {
		// 	// 		const updatedItem = [
		// 	// 			existingItem[0],
		// 	// 			[
		// 	// 				...existingItem[1].slice(0, nestedIndex),
		// 	// 				updatedValues,
		// 	// 				...existingItem[1].slice(nestedIndex + 1),
		// 	// 			],
		// 	// 		];
		// 	// 		addItemToCart([
		// 	// 			...cartItems.slice(0, itemIndex),
		// 	// 			updatedItem,
		// 	// 			...cartItems.slice(itemIndex + 1),
		// 	// 		]);
		// 	// 		break;
		// 	// 	}
		// 	// }
		// } else {
		// 	addItemToCart(...cartItems, userItems);
		// }

		addItemToCart(userItems);

		// console.log(`state: `, cartItems);
		// console.log(cartItems.slice(0, 0), cartItems.slice(0, 1));
		// console.log(userItems);
	}

	render() {
		const { brand, name, prices } = this.props.products;
		const { items } = this.state;

		const {
			priceHeading,
			className,
			cartItem,
			productID,
			products,
			attributes,
		} = this.props;

		return (
			<article className={className}>
				<div className={`${className}__headers`}>
					<h2>{brand}</h2>
					<h3>{name}</h3>
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
						style={{ fontSize: cartItem ? '1rem' : '' }}
					>
						<span className="pd__price-price__symbol">
							{prices[0].currency.symbol}
						</span>
						{prices[0].amount}
					</span>
				</div>

				<Button
					className="pdp__cart-btn"
					disable={products.stock}
					onClick={this.cartItemHandler}
					cartItem={cartItem}
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

export default connect(mapStateToProps, { addItemToCart })(DescriptionCard);
