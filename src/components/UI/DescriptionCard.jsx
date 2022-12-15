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

	itemClickHandler(e, item) {
		if (e.target.dataset.clicked) {
			e.target.dataset.clicked = true;
			// e.target.style.backgroundColor = 'red';
		}
		// console.log(e.target.dataset.clicked);
		// console.log(e);

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
							key={i}
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
