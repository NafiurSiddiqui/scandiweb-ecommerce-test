import React, { Component, createRef } from 'react';

export default class ProgressiveImage extends Component {
	constructor() {
		super();
		this.state = {
			isLoaded: false,
		};
		this.nodeRef = createRef();

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
		const { cartItem, src, className, index } = this.props;
		// console.log();
		let nodeRef = this.nodeRef.current?.dataset.active;

		return (
			<li
				className={
					this.state.isLoaded
						? `${className} image-gallery-item`
						: 'skeleton-gallery'
				}
				aria-label="current photo of the product"
				// increase or decrease this index by clicking slider btns
				data-active={index === 1 ? true : false}
				ref={this.nodeRef}
				// style={{opacity: cartItem && nodeRef ? '1': '0' }}
			>
				{this.state.isLoaded ? null : (
					<div className="skeleton-gallery__placeholder" />
				)}
				<img
					style={this.state.isLoaded ? {} : { display: 'none' }}
					src={src}
					alt="product"
					className={`${className}${
						cartItem ? '__image' : ''
					} image-gallery__image`}
					onLoad={this.imageStateHandler}
					onClick={this.imgSrcHandler}
				/>
			</li>
		);
	}
}
