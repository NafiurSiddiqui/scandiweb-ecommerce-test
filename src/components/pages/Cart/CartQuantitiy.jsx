import React, { Component } from 'react';

import ProgressiveImage from '../../Utilities/ProgressiveImage';

export default class CartQuantitiy extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemCount: 0,
		};
		this.incrementItemHandler = this.incrementItemHandler.bind(this);
		this.decrementItemHandler = this.decrementItemHandler.bind(this);
	}

	incrementItemHandler() {
		const { incrementItem, attributes } = this.props;
		incrementItem(attributes);
	}

	decrementItemHandler() {
		const { decrementItem, attributes } = this.props;
		decrementItem(attributes);
	}

	render() {
		const { images, imageCount, quantity } = this.props;
		const { itemCount } = this.state;

		return (
			<section className="cart-quantity-container">
				<div
					className="cart-quantity-container__actions"
					aria-roledescription="Quantity button container"
				>
					<div className="cart-quantity-container__actions-btn">
						<span
							className="cart-quantity-container__actions-btn-symbol"
							onClick={this.incrementItemHandler}
							role={'button'}
						>
							+
						</span>
					</div>
					<span className="cart-quantity-container__actions-amount">
						{quantity || itemCount}
					</span>
					<div className="cart-quantity-container__actions-btn">
						<span
							className="cart-quantity-container__actions-btn-symbol"
							onClick={this.decrementItemHandler}
							role={'button'}
						>
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
