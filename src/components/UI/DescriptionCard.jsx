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
			activeItems: [],
			targetDateSet: false,
		};
		this.itemClickHandler = this.itemClickHandler.bind(this);
	}

	itemClickHandler(e, item, activeItems) {
		this.setState((prev) => ({
			activeItems: [...prev.activeItems, item],
		}));

		if (this.state.activeItems.includes(item)) {
			//pop the item
			this.setState((prev) => ({
				activeItems: prev.activeItems.filter((itemName) => itemName !== item),
			}));
		}

		let target = e.target.dataset.clicked;

		if (e.target.dataset.clicked) {
			e.target.dataset.clicked = true;
		} else {
			e.target.dataset.clicked = false;

			if (this.state.activeItems.includes(item)) {
				//pop the item
				this.setState((prev) => ({
					activeItems: prev.activeItems.filter((itemName) => itemName !== item),
				}));
			}
		}

		this.setState({
			activeItem: item,
		});
	}

	render() {
		const { brand, name, attributesID, attributesItem, prices } =
			this.props.products[0];
		// console.log(this.state.activeItem);
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
					<span className="pd__price-header">{}</span>
					<span className="pd__price-price">
						<span className="pd__price-price__symbol">$</span>
						50.00
					</span>
				</div>
			</article>
		);
	}
}
