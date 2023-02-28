import React, { Component } from 'react';
import MiniCartIcon from '../../assets/MiniCartIcon';
import { connect } from 'react-redux';
import { getProductID } from '../../store/productsSlice';
import { Link } from 'react-router-dom';
import { userCurrency } from '../../Utilities/userCurrency';

class CategoryCard extends Component {
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
			products,
		} = this.props;
		userCurrency();
		// console.log(heading);
		return (
			<li className={'category-item'} key={index}>
				<div className="category-item-wrapper">
					<div className={'category-item__image-wrapper'}>
						<Link to={'/ProductDescription'}>
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
						</Link>
						<MiniCartIcon
							color={'#ffffff'}
							className={`category-item__image-wrapper__cart`}
							productID={productID}
							inStock={inStock}
							products={products}
						/>
					</div>

					<div className="category-item__meta-container">
						<h2>{heading}</h2>
						<p>
							<span>{currencySymbol ? currencySymbol : '$'}</span>
							{price}
						</p>
					</div>
				</div>
			</li>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		protductID: state.products,
	};
};

const mapDispatchToProps = { getProductID };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
