import React, { Component } from 'react';
import AttributeItem from '../pages/PDP/AttributeItem';

/**
 * @className : PD = product description
 */

export default class DescriptionCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: '',
			selectedValues: [],
		};
		this.itemClickHandler = this.itemClickHandler.bind(this);
	}

	itemClickHandler(item) {
		this.setState({
			activeItem: item,
		});

		console.log('What?');
	}

	render() {
		const { brand, name, attributesID, attributesItem, prices } =
			this.props.products;

		const { priceHeading, className, cartItem } = this.props;

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
							activeItem={this.state.activeItem}
							key={i}
							onClick={this.itemClickHandler}
							className={className}
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
