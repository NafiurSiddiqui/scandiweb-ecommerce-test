import React, { Component } from 'react';
import DescriptionCard from '../../UI/DescriptionCard';
import { connect } from 'react-redux';
import { Query } from '@apollo/client/react/components';
import ProgressiveImage from '../../Utilities/ProgressiveImage';
import { attHandler } from '../../Utilities/ProductHandler';
import { Navigate } from 'react-router-dom';
import DisplayMessage from '../../Utilities/DisplayMessage';
import Skeleton from '../../Layout/skeleton';
import { GET_PRODUCTS_BY_ID } from '../../Utilities/query';
import { getProductID } from '../../store/productsSlice';

/**
 * @className - 'PDP' = product description
 *
 */

class ProductDescription extends Component {
	constructor() {
		super();

		this.state = {
			selectedImgSrc: '',
			txtOverFlow: false,
			products: [],
		};
		this.selectedImgSrcHandler = this.selectedImgSrcHandler.bind(this);
		this.textOverFlowHandler = this.textOverFlowHandler.bind(this);
	}

	//IMAGE GALLERY
	selectedImgSrcHandler(src) {
		this.setState({
			selectedImgSrc: src,
		});
	}
	//description overflow handler
	textOverFlowHandler(e) {
		e.target.textContent.length >= 1172
			? this.setState({ ...this.state, txtOverFlow: !this.state.txtOverFlow })
			: this.setState(null);
	}

	componentWillUnmount() {
		this.props.getProductID('');
	}

	render() {
		const { productID } = this.props;

		if (!productID) {
			return <Navigate to={'/'} />;
		} else {
			return (
				<Query
					query={GET_PRODUCTS_BY_ID}
					variables={{ productID: productID }}
					fetchPolicy={'network-only'}
				>
					{({ error, loading, data }) => {
						if (error) return <DisplayMessage error={error} />;
						if (loading || !data) return <Skeleton />;

						const product = data.product;

						let productObj = {
							name: product.name,
							attributes: attHandler(product.attributes),
							quantity: { quantity: 1 },
							brand: product.brand,
							gallery: product.gallery,
							description: product.description,
							prices: product.prices,
							inStock: product.inStock,
						};

						//gallery overFlow guard
						let galleryOverflow = product.gallery.length > 5;

						return (
							<section className="pdp">
								<div className="pdp-image">
									<ul
										className="pdp-image-gallery"
										style={
											galleryOverflow
												? { overflowY: 'scroll' }
												: { overflowY: 'none' }
										}
									>
										{product.gallery.map((item, index) => (
											<ProgressiveImage
												src={item}
												key={item}
												onClick={this.selectedImgSrcHandler}
												className={'pdp-image'}
											/>
										))}
									</ul>

									<img
										className="pdp-image-hero"
										alt="product"
										src={
											this.state.selectedImgSrc
												? this.state.selectedImgSrc
												: product.gallery[0]
										}
									/>
								</div>
								<article className="pdp_pd">
									<DescriptionCard
										product={productObj}
										priceHeading={true}
										getItemValues={this.getItemValues}
										attributes={productObj.attributes}
										className="pd"
										prices={productObj.prices}
									/>

									<p
										className="pd__description"
										onClick={this.textOverFlowHandler}
										style={
											this.state.txtOverFlow
												? {
														display: '-webkit-box',
														WebkitLineClamp: '0',
														WebkitBoxOrient: 'vertical',
														overflowY: 'scroll',
												  }
												: {
														display: '-webkit-box',
														WebkitLineClamp: '6',
														WebkitBoxOrient: 'vertical',
														overflow: 'hidden',
												  }
										}
									>
										{productObj.description}
									</p>
								</article>
							</section>
						);
					}}
				</Query>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		productID: state.products.productID,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

const mapDispatchToProps = { getProductID };
export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);

/**
 * @fetchPolicy - caching leads to duplication of the attributes here.
 */
