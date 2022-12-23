import React, { Component } from 'react';
import ProgressiveImage from '../../Utilities/ProgressiveImage';

export default class CartQuantitiy extends Component {
	render() {
		return (
			<section className="cart-items__item quantity-container">
				<div className="quantity-container__quantity">
					<span className="quantity-container__quantity-btn">+</span>
					<span className="quantity-container__quantity-amount">1</span>
					<span className="quantity-container__quantity-btn">-</span>
				</div>

				<ul className="quantity-container__image-gallery">
					<ProgressiveImage />
					<div className="quantity-conatiner__image-gallery-btns">
						<span className="quantity-conatiner__image-gallery-btn">ᐳ</span>
						<span className="quantity-conatiner__image-gallery-btn">ᐸ</span>
					</div>
				</ul>
			</section>
		);
	}
}
