import React, { Component } from 'react';
import MiniCartIcon from '../../assets/MiniCartIcon';

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
					<div
						className={'category-item__image-wrapper__image'}
						style={{
							backgroundImage: `url(${this.props.image})`,
							...this.style,
						}}
					></div>
					{!this.props.inStock ? (
						<span className={'category-item__image-wrapper-outOfStock'}>
							OUT OF STOCK
						</span>
					) : null}

					<MiniCartIcon
						color={'#ffffff'}
						className={`category-item__image-wrapper__cart`}
					/>
				</div>

				<div className="category-item__meta-container">
					<h2>{this.props.heading}</h2>
					<p>${this.props.price}</p>
				</div>
			</li>
		);
	}
}
