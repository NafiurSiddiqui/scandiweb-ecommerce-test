import React, { Component } from 'react';

/**
 * @className : PD = product description
 */

export default class DescriptionCard extends Component {
	constructor() {
		super();
		this.state = {
			itemIsClicked: false,
		};
		this.itemClickHandler = this.itemClickHandler.bind(this);
	}

	itemClickHandler(e) {
		console.log(e.target.dataset.clicked);
	}

	render() {
		const { brand, name, attributesID, attributesItem, prices } =
			this.props.products[0];

		return (
			<article className="pd">
				<div className="pd__headers">
					<h2>{brand}</h2>
					<h3>{name}</h3>
				</div>
				{attributesID.map((element, i) => {
					return (
						<ul key={i} className="pd__attributions">
							<li key={element} className="pd__attribution">
								<span className="pd__attribution__ID">{element}</span>
								<ul className="pd__attribution__items">
									{attributesItem[i].map((item) => (
										<li
											className="pd__attribution__item"
											role={'button'}
											key={item}
											data-clicked={false}
											onClick={this.itemClickHandler}
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
