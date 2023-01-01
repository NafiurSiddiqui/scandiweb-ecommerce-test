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
			selectedValues: [],
		};
		this.getSelectedValues = this.getSelectedValues.bind(this);
	}

	getSelectedValues(values) {
		console.log(values);

		this.setState((prev) => ({
			selectedValues: [...prev.selectedValues, values],
		}));
	}

	render() {
		const { brand, name, attributesID, attributesItem, prices } =
			this.props.products;

		const { priceHeading, className, cartItem, productID } = this.props;

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
	};
};

export default connect(mapStateToProps)(DescriptionCard);
