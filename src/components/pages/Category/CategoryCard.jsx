import React, { Component } from 'react';

export default class CategoryCard extends Component {
	//if currency is selected, showSelectedCurrency || default

	constructor(props) {
		super(props);

		this.style = {
			backgroundSize: 'contain',
			backgroundPosition: ' center',
			backgroundRepeat: 'no-repeat',
			height: '100%',
			width: ' 100%',
		};
	}

	render() {
		return (
			<li className={'category-item'} key={this.props.index}>
				<div className={'category-item__image-wrapper'}>
					{/* <img src={this.props.image} alt="products" /> */}

					<div
						className={'category-item-wrapper__image'}
						style={{
							backgroundImage: `url(${this.props.image})`,
							...this.style,
						}}
					></div>
				</div>

				<h2>{this.props.heading}</h2>
				<p>{this.props.price}</p>
			</li>
		);
	}
}
