import React, { Component } from 'react';
import AttributeItem from './AttributeItem';

/**
 * @className : PD = product description
 */

export default class DescriptionCard extends Component {
	constructor() {
		super();
		this.state = {
			activeItem: '',
		};
		this.itemClickHandler = this.itemClickHandler.bind(this);
	}

	itemClickHandler(item) {
		this.setState({
			activeItem: item,
		});
	}

	render() {
		const { brand, name, attributesID, attributesItem } =
			this.props.products[0];

		const { priceHeading } = this.props;

		return (
			<article className="pd">
				<div className="pd__headers">
					<h2>{brand}</h2>
					<h3>{name}</h3>
				</div>
				{attributesID.map((element, i) => {
					return (
						<AttributeItem
							propsKey={i}
							element={element}
							attributesItem={attributesItem}
							activeItem={this.state.activeItem}
							activeItems={this.state.activeItems}
							key={i}
							onClick={this.itemClickHandler}
						/>
					);
				})}

				<div className="pd__price">
					{priceHeading ? <h4 className="pd__price-header">PRICE:</h4> : null}
					<span className="pd__price-price">
						<span className="pd__price-price__symbol">$</span>
						50.00
					</span>
				</div>
			</article>
		);
	}
}
