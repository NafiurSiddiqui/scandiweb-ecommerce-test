import React, { Component } from 'react';

import ProgressiveImage from '../../Utilities/ProgressiveImage';

export default class CartQuantitiy extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemCount: 0,
		};
		this.increaseItemCount = this.increaseItemCount.bind(this);
		this.decreaseItemCount = this.decreaseItemCount.bind(this);
	}

	increaseItemCount() {
		this.setState({
			itemCount: this.state.itemCount + 1,
		});
	}

	decreaseItemCount() {
		this.setState({
			itemCount: this.state.itemCount - 1,
		});
	}

	render() {
		const { images, imageCount } = this.props;
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
							onClick={this.increaseItemCount}
							role={'button'}
						>
							+
						</span>
					</div>
					<span className="cart-quantity-container__actions-amount">
						{itemCount}
					</span>
					<div className="cart-quantity-container__actions-btn">
						<span
							className="cart-quantity-container__actions-btn-symbol"
							onClick={this.decreaseItemCount}
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
