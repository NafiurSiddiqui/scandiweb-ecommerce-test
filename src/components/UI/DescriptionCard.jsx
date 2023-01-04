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
		};
		this.getSelectedValues = this.getSelectedValues.bind(this);
	}

	componentDidMount() {
		const { selectedValues } = this.state;
		const { attributesItem, attributesID } = this.props.products;

		//DEFAULT Selected items
		const mappedDefaultItem = attributesItem.map((item) => item[0]);

		const defaultSelection = attributesID.reduce((acc, key, index) => {
			acc[key] = mappedDefaultItem[index];

			return acc;
		}, {});

		this.setState({
			defaultSelection: defaultSelection,
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

	render() {
		const { brand, name, attributesID, attributesItem, prices } =
			this.props.products;

		const {
			priceHeading,
			className,
			cartItem,
			productID,
			selectedProduct,
			products,
			addItemToCart,
		} = this.props;

		// console.log(this.state.selectedValues);
		// console.log(this.state.defaultSelection);

		return (
			<article className={className}>
				<div className={`${className}__headers`}>
					<h2>{brand}</h2>
					<h3>{name}</h3>
				</div>
				{attributesID?.map((attHeader, i) => {
					return (
						<AttributeItem
							propsKey={i}
							attHeader={attHeader}
							attributesItem={attributesItem}
							key={i}
							className={className}
							getSelectedValues={this.getSelectedValues}
							productID={productID}
						/>
					);
				})}

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
