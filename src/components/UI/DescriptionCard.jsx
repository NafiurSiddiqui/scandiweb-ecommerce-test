import React, { Component } from 'react';

/**
 * @className : PD = product description
 */

export default class DescriptionCard extends Component {
	render() {
		return (
			<article className="pd">
				<div className="pd__headers">
					<h2>Brand Name</h2>
					<h3>product name</h3>
				</div>
				<div className="pd__size">
					<span className="pd__size-header">SIZE</span>

					<ul className="pd__size-btns">
						{/* map */}
						<li className="pd__size-btn">S</li>
					</ul>
				</div>
				<div className="pd__color">
					<span className="pd__color-heading">COLOR</span>

					<ul className="pd__color-btns">
						{/* map */}
						<li className="pd__color-btn" role={'button'}>
							green
						</li>
					</ul>
				</div>
				<div className="pd__price">
					<span className="pd__price-header">PRICE</span>
					<span className="pd__price-price">
						<span className="pd__price-price__symbol">$</span>
						50.00
					</span>
				</div>
			</article>
		);
	}
}
