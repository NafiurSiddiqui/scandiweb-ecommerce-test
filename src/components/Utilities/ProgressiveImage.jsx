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
		const { cartItem, images } = this.props;
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
					src={images}
					alt="product"
					className="pdp-image-gallery__image"
					onLoad={this.imageStateHandler}
					onClick={this.imgSrcHandler}
				/>
			</li>
		);
	}
}
