import React, { Component } from 'react';

import ProgressiveImage from '../../Utilities/ProgressiveImage';

export default class CartQuantitiy extends Component {
	render() {
		const { images, imageCount } = this.props;

		return (
			<section className="cart-quantity-container">
				<div className="cart-quantity-container__actions">
					<div className="cart-quantity-container__actions-btn" role={'button'}>
						<span className="cart-quantity-container__actions-btn-symbol">
							+
						</span>
					</div>
					<span className="cart-quantity-container__actions-amount">1</span>
					<div className="cart-quantity-container__actions-btn">
						<span className="cart-quantity-container__actions-btn-symbol">
							-
						</span>
					</div>
				</div>

				<ul className="quantity-container__image-gallery">
					{images.map((item, i) => (
						<ProgressiveImage
							cartItem={true}
							src={item}
							key={item}
							className={'quantity-container-image-item'}
							imageCount={imageCount}
							index={i}
						/>
					))}
				</ul>
			</section>
		);
	}
}
