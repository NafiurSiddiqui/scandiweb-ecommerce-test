import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttributeItem from '../pages/PDP/AttributeItem';

/**
 * @className : PD = product description
 */

class DescriptionCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedBrand: this.props.products.name,
			selectedValues: [],
		};
		this.getSelectedValues = this.getSelectedValues.bind(this);
	}

	getSelectedValues(id, itemValues) {
		const { selectedValues } = this.state;
		// console.log(Object.values(values));
		// const uniqueValues = [...new Set(values.map((item) => item.itemValues))];
		let sameId;

		sameId = selectedValues.includes(id) ? true : false;

		console.log(selectedValues.includes(id));

		if (sameId) {
			this.setState({
				selectedValues: [id, itemValues],
			});
		} else {
			this.setState((prev) => ({
				selectedValues: [...prev.selectedValues, id, itemValues],
			}));
		}
	}

	render() {
		const { brand, name, attributesID, attributesItem, prices } =
			this.props.products;

		const { priceHeading, className, cartItem, productID, selectedProduct } =
			this.props;

		console.log(this.state.selectedValues);

		//DEFAULT Selected items
		const mappedDefaultItem = attributesItem.map((item) => item[0]);

		const defaultSelection = {
			attributesID: ' DEFAULT',
			attributesItem: mappedDefaultItem,
		};

		// console.log(defaultSelection);

		return (
			<article className={className}>
				<div className={`${className}__headers`}>
					<h2>{brand}</h2>
					<h3>{name}</h3>
				</div>
				{attributesID?.map((element, i) => {
					return (
						<AttributeItem
							propsKey={i}
							element={element}
							attributesItem={attributesItem}
							key={i}
							className={className}
							getSelectedValues={this.getSelectedValues}
							productID={productID}
							defaultSelection={defaultSelection}
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

export default connect(mapStateToProps)(DescriptionCard);
