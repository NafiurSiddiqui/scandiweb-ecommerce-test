import React, { Component } from 'react';
import MiniCartIcon from '../../assets/MiniCartIcon';
import { connect } from 'react-redux';
import { getProductID } from '../../store/categorySlice';

class CategoryCard extends Component {
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

	// addToCart(){
	// 	console.log('Hooked!');
	// }

	render() {
		const {
			index,
			productID,
			getProductID,
			image,
			inStock,
			heading,
			price,
			currencySymbol,
		} = this.props;

		return (
			<li
				className={'category-item'}
				key={index}
				onClick={() => getProductID(productID)}
			>
				<div className={'category-item__image-wrapper'}>
					<div
						className={'category-item__image-wrapper__image'}
						style={{
							backgroundImage: `url(${image})`,
							...this.style,
						}}
					></div>
					{!inStock ? (
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
					<h2>{heading}</h2>
					<p>
						<span>{currencySymbol ? currencySymbol : '$'}</span>
						{price}
					</p>
				</div>
			</li>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		protductIDState: state.category,
	};
};

const mapDispatchToProps = { getProductID };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
