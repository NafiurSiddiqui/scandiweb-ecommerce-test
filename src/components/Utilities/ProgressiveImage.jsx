import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProgressiveImage extends Component {
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
		const { cartItem, src, className, index, imageCount } = this.props;
		//if index is equal to the state count
		const miniCartStyle =
			cartItem && index === imageCount
				? { opacity: '1', zIndex: '2' }
				: { opacity: '0', zIndex: '0' };
		return (
			<li
				className={
					this.state.isLoaded
						? `${className} image-gallery-item`
						: 'skeleton-gallery'
				}
				aria-label="current photo of the product"
				style={{ ...miniCartStyle }}
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

const mapStateToProps = (state) => {
	return {
		imageCount: state.counter.imageCount,
	};
};
export default connect(mapStateToProps)(ProgressiveImage);
