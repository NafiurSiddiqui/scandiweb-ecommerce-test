import React, { Component } from 'react';

/**
 * @className : PD = product description
 */

export default class DescriptionCard extends Component {
	render() {
		const { brand, name, images, attributesID, attributesItem, prices } =
			this.props.products[0];
		const product = this.props.products[0];
		const items = [attributesID, attributesItem];

		let itemId;
		let itemExtraction;
		let itemObj = {};

		for (let i = 0; i < items.length; i++) {
			itemId = items[0];
			itemExtraction = items[1];
		}

		itemId.forEach((element, i) => {
			itemObj[element] = itemExtraction[i];
		});

		for (const item of Object.entries(itemObj)) {
			item.map((item) => {
				return item;
			});
		}

		return (
			<article className="pd">
				<div className="pd__headers">
					<h2>{brand}</h2>
					<h3>{name}</h3>
				</div>
				{itemId.map((element, i) => {
					// console.log(element, itemExtraction[i]);
					// <ul className="pd__attributions">
					// <li key={element} className="pd__attribution">
					// 	<span className="pd__attribution__ID">{element}</span>
					// 	<ul className="pd__attributions__items">
					// 		<li className="pd__attributions__item" role={'button'}>
					// 			{itemExtraction[i]}
					// 		</li>
					// 	</ul>
					// </li>
					// </ul>;
					return (
						<ul key={i} className="pd__attributions">
							<li key={element} className="pd__attribution">
								<span className="pd__attribution__ID">{element}</span>
								<ul className="pd__attribution__items">
									{itemExtraction[i].map((item) => (
										<li
											className="pd__attribution__item"
											role={'button'}
											key={item}
										>
											{item}
										</li>
									))}
								</ul>
							</li>
						</ul>
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
