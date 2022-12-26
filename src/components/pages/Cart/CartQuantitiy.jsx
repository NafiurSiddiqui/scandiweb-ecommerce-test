import React, { Component } from 'react';
import ProgressiveImage from '../../Utilities/ProgressiveImage';

export default class CartQuantitiy extends Component {
	render() {
		return (
			<section className="cart-items__item__quantity-container">
				<div className="quantity-container__quantity">
					<div className="quantity-container__quantity-btn" role={'button'}>
						<span className="quantity-container__quantity-btn-symbol">+</span>
					</div>
					<span className="quantity-container__quantity-amount">1</span>
					<div className="quantity-container__quantity-btn">
						<span className="quantity-container__quantity-btn-symbol">-</span>
					</div>
				</div>

				<ul className="quantity-container__image-gallery">
					<ProgressiveImage cartItem={true} />
				</ul>
			</section>
		);
	}
}
