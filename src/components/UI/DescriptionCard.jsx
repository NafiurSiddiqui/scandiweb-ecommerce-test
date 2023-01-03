import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttributeItem from '../pages/PDP/AttributeItem';
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
		const { getItemValues } = this.props;

		//DEFAULT Selected items
		const mappedDefaultItem = attributesItem.map((item) => item[0]);

		const defaultSelection = attributesID.reduce((acc, key, index) => {
			acc[key] = mappedDefaultItem[index];

			return acc;
		}, {});

		getItemValues(defaultSelection);
	}

	getSelectedValues(id, itemValues) {
		const { selectedValues } = this.state;
		const { getItemValues } = this.props;
		let sameId;

		sameId = selectedValues.includes(id) ? true : false;

		if (sameId) {
			this.setState({
				selectedValues: [id, itemValues],
			});
			getItemValues({ id, itemValues });
		} else {
			this.setState((prev) => ({
				selectedValues: [...prev.selectedValues, id, itemValues],
			}));

			// getItemValues({ id, itemValues });
		}
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
		} = this.props;

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
					// onClick={() => addItemToCart()}
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

export default connect(mapStateToProps)(DescriptionCard);
