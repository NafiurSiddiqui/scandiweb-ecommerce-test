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
			selectedBrand: this.props.products.name,
			selectedValues: [],
			defaultSelection: {},
			items: [],
		};
		this.getSelectedValues = this.getSelectedValues.bind(this);
		this.updateItems = this.updateItems.bind(this);
	}

	componentDidMount() {
		const { attributes } = this.props;

		// console.log('Does it?');
		this.setState({
			items: Object.entries(attributes),
		});
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
		console.log(itemIndex, btnIndex);

		// this.setState((prevState) => {
		// 	//make a new array
		// 	const newItems = [...prevState.items];

		// 	// console.log(newItems[itemIndex][1][btnIndex].isChecked);
		// 	//update the new array
		// 	newItems[itemIndex][1][btnIndex].isChecked =
		// 		!newItems[itemIndex][1][btnIndex].isChecked;

		// 	// console.log(newItems);
		// 	return { items: newItems };
		// });
	}

	sendItemToCart() {
		// console.log(this.state.selectedValues);
		// addItemToCart()
	}

	render() {
		const { brand, name, prices } = this.props.products;
		const { items, selectedValues } = this.state;

		console.log(items);

		const {
			priceHeading,
			className,
			cartItem,
			productID,
			products,
			attributes,
			addItemToCart,
		} = this.props;

		// console.log(selectedValues);
		// console.log(Object.entries(attributes));

		// const items = Object.entries(attributes).map((item) => [
		// 	item[0],
		// 	item[1].map((item) => item.value),
		// 	item[1].map((item) => item.isChecked),
		// ]);

		// console.log(items.map((item) => item[1]));

		// console.log(attributesItem);

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

				{/* {attributes
					? Object.entries(attributes).map((item, i) => {
							return (
								<AttributeItem
									propsKey={i}
									attHeader={item[0]}
									attributesItem={item[1]}
									attributes={attributes}
									key={i}
									className={className}
									getSelectedValues={this.getSelectedValues}
									productID={productID}
								/>
							);
					  })
					: null} */}

				{/* {attributesID?.map((attHeader, i) => {
					return (
						<AttributeItem
							propsKey={i}
							attHeader={attHeader}
							attributesItem={attributesItem}
							attributes={attributes}
							key={i}
							className={className}
							getSelectedValues={this.getSelectedValues}
							productID={productID}
						/>
					);
				})} */}

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
					onClick={() => addItemToCart()}
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
	};
};

export default connect(mapStateToProps, { addItemToCart })(DescriptionCard);
