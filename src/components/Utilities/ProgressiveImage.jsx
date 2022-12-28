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
		//return if cartItem
		if (this.props.cartItem) {
			return;
		}
		this.props.onClick(src.target.src);
	}

	render() {
		const { cartItem, images, className } = this.props;
		return (
			<li
				className={
					this.state.isLoaded
						? `${className} image-gallery-item`
						: 'skeleton-gallery'
				}
				aria-label="current photo of the product"
			>
				{this.state.isLoaded ? null : (
					<div className="skeleton-gallery__placeholder" />
				)}
				<img
					style={this.state.isLoaded ? {} : { display: 'none' }}
					src={images}
					alt="product"
					className={`${className} image-gallery__image`}
					onLoad={this.imageStateHandler}
					onClick={this.imgSrcHandler}
				/>
			</li>
		);
	}
}
