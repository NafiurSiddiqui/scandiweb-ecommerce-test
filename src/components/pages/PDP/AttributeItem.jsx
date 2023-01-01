import React, { Component } from 'react';
import AttributionBtn from './AttributionBtn';

export default class AttributeItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedProduct: {
				id: this.props.productID,
				itemValues: [],
			},
		};
		this.itemValuesHandler = this.itemValuesHandler.bind(this);
	}

	itemValuesHandler = (value) => {
		this.setState((prev) => ({
			selectedProduct: {
				id: prev.selectedProduct.id,
				itemValues: [...prev.selectedProduct.itemValues, value],
			},
		}));
	};

	render() {
		const { propsKey, element, attributesItem, className, getSelectedValues } =
			this.props;

		console.log(this.state.selectedProduct);

		return (
			<ul key={propsKey} className={`${className}__attributions`}>
				<li
					key={element}
					className={`${className}__attribution`}
					onClick={(e) => console.log(element, e)}
				>
					<h4 className={`${className}__attribution-header`}>
						{element.toUpperCase()}:
					</h4>
					<ul className={`pd__attribution__items`}>
						{attributesItem[propsKey].map((item, i) => {
							return (
								<AttributionBtn
									key={item}
									item={item}
									attributeTitle={element}
									className={className}
									index={i}
									itemValuesHandler={this.itemValuesHandler}
									defaultValue={attributesItem}
								/>
							);
						})}
					</ul>
				</li>
			</ul>
		);
	}
}
