import React, { Component } from 'react';
import ProgressiveImage from '../../Utilities/ProgressiveImage';

export default class CartQuantitiy extends Component {
	render() {
		return (
			<section className="cart-items__item__quantity-container">
				<div className="quantity-container__quantity">
					<span className="quantity-container__quantity-btn">+</span>
					<span className="quantity-container__quantity-amount">1</span>
					<span className="quantity-container__quantity-btn">-</span>
				</div>

				<ul className="quantity-container__image-gallery">
					<ProgressiveImage cartItem={true} />
				</ul>
			</section>
		);
	}
}
