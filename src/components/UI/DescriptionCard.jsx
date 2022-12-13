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

		return (
			<article className="pd">
				<div className="pd__headers">
					<h2>{brand}</h2>
					<h3>{name}</h3>
				</div>
				{/* <ul className="pd__attributions">
					{items.map((item) => {
						// console.log(item);
						return (
							<li key={item} className="pd__attribution">
								<span className="pd__attribution__ID">{item}</span>
								<ul className="pd__attributions__items">
									<li className="pd__attributions__item" role={'button'}></li>
								</ul>
							</li>
						);
					})}
				</ul> */}
				{/* {product.map((id, items) => {
					return (
						<ul className="pd__attributions">
							<li className="pd__attribution" key={id}>
								<span className="pd__attribution__ID">{id}</span>
								<ul className="pd__attributions__items">
									{items.map((item) => {
										return (
											<li
												className="pd__attributions__item"
												role={'button'}
												key={item}
											>
												{item}
											</li>
										);
									})}
								</ul>
							</li>
						</ul>
					);
				})} */}

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
