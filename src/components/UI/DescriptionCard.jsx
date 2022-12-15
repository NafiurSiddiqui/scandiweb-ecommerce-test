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

		// const guardClass = this.state.activeItems.forEach(
		// 	(items, i) => items === item
		// );
		// for (let i = 0; i < activeItems.length; i++) {
		// 	console.log(activeItems[i] === item);
		// }

		if (e.target.dataset.clicked) {
			e.target.dataset.clicked = true;
			// e.target.style.backgroundColor = 'red';

			// console.log(this.state.activeItems);
		} else {
			e.target.dataset.clicked = false;
			// e.target.style.backgroundColor = 'white';
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
		console.log(this.state.activeItems);
		return (
			<article className="pd">
				<div className="pd__headers">
					<h2>{brand}</h2>
					<h3>{name}</h3>
				</div>
				{attributesID.map((element, i) => {
					return (
						// <ul key={i} className="pd__attributions">
						// 	<li key={element} className="pd__attribution">
						// 		<span className="pd__attribution__ID">{element}</span>
						// 		<ul className="pd__attribution__items">
						// 			{attributesItem[i].map((item) => {
						// 				let itemMatched = item === this.state.activeItem;

						// 				return (
						// 					<li
						// 						className={`pd__attribution__item ${
						// 							itemMatched ? 'itemActive' : ''
						// 						}`}
						// 						role={'button'}
						// 						key={item}
						// 						data-clicked={false}
						// 						onClick={(e) => this.itemClickHandler(e, item)}
						// 					>
						// 						{item}
						// 					</li>
						// 				);
						// 			})}
						// 		</ul>
						// 	</li>
						// </ul>
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
