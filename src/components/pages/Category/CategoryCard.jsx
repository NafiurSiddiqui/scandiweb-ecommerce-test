import React, { Component } from 'react';
import MiniCartIcon from '../../assets/MiniCartIcon';
import { connect } from 'react-redux';
import { getProductID } from '../../store/categorySlice';

/**
 * @STATE -
 * TotalCartItem
 * Same item should not be selected and shown on the badge
 * if, attirubtes selected then cartItem = selectedAttributes, else, first defaults.
 */

/**
 * 1. Cart item total quantity badge on the cart icon should display the total cart item quantity not the cart item count.
 * 2. It should be possible to add a product to the cart from PLP. But it shouldn’t be possible to add a product to the cart without selected attributes. In order to solve this, you can either:  
-  Add a product to the cart from PLP only if it doesn’t have any attributes (like AirTag). 
-  Add a product to the cart with first selected attributes as defaults. 
 */

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
			<li className={'category-item'} key={index}>
				<div className={'category-item__image-wrapper'}>
					<div
						className={'category-item__image-wrapper__image'}
						style={{
							backgroundImage: `url(${image})`,
							...this.style,
						}}
						onClick={() => getProductID(productID)}
					></div>
					{!inStock ? (
						<span
							className={'category-item__image-wrapper-outOfStock'}
							onClick={() => getProductID(productID)}
						>
							OUT OF STOCK
						</span>
					) : null}

					<MiniCartIcon
						color={'#ffffff'}
						className={`category-item__image-wrapper__cart`}
						itemID={productID}
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
