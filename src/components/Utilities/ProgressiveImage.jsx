import React, { Component } from 'react';

export default class ProgressiveImage extends Component {
	constructor() {
		super();
		this.state = {
			isLoaded: false,
		};

		this.imageStateHandler = this.imageStateHandler.bind(this);
		this.imgSrcHandler = this.imgSrcHandler.bind(this);
	}

	imageStateHandler() {
		this.setState({ isLoaded: true });
	}

	imgSrcHandler(src) {
		this.props.onClick(src.target.src);
	}

	render() {
		const { cartItem } = this.props;
		return (
			<li
				className={
					this.state.isLoaded ? 'pdp__image-gallery-item' : 'skeleton-gallery'
				}
			>
				{this.state.isLoaded ? null : (
					<div className="skeleton-gallery__placeholder" />
				)}
				<img
					style={this.state.isLoaded ? {} : { display: 'none' }}
					src={this.props.src}
					alt="product"
					className="pdp-image-gallery__image"
					onLoad={this.imageStateHandler}
					onClick={this.imgSrcHandler}
				/>
				{cartItem ? (
					<div className="quantity-conatiner__image-gallery-btns">
						<span className="quantity-conatiner__image-gallery-btn">ᐳ</span>
						<span className="quantity-conatiner__image-gallery-btn">ᐸ</span>
					</div>
				) : null}
			</li>
		);
	}
}
