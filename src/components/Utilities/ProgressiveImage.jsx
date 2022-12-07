import React, { Component } from 'react';

export default class ProgressiveImage extends Component {
	constructor() {
		super();
		this.state = {
			isLoaded: false,
		};

		this.placeholderStyle = {
			width: '150px',
			height: '150px',
			backgroundColor: 'aqua',
			padding: '0.4rem 0',
		};

		this.imageStateHandler = this.imageStateHandler.bind(this);
	}

	imageStateHandler() {
		this.setState({ isLoaded: true });
	}

	render() {
		return (
			<div>
				{this.state.isLoaded ? null : <div style={this.placeholderStyle} />}
				<img
					style={this.state.isLoaded ? {} : { display: 'none' }}
					src={this.props.src}
					alt="product"
					className="pdp-image-gallery__image"
					onLoad={() => this.setState({ isLoaded: true })}
				/>
			</div>
		);
	}
}
