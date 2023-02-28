import React, { Component } from 'react';
import DescriptionCard from '../../UI/DescriptionCard';
import { connect } from 'react-redux';
import { GET_ALL_CATEGORIES } from '../Category/CategoryList';
import { Query } from '@apollo/client/react/components';
import ProgressiveImage from '../../Utilities/ProgressiveImage';
import productHandler, {
	attHandler,
	cartItemHandler,
} from '../../Utilities/ProductHandler';
import { Navigate } from 'react-router-dom';
import DisplayMessage from '../../Utilities/DisplayMessage';
import Skeleton from '../../Layout/skeleton';
import { GET_PRODUCTS_BY_ID } from '../../Utilities/query';
import { userCurrency } from '../../Utilities/userCurrency';

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
		};
		this.selectedImgSrcHandler = this.selectedImgSrcHandler.bind(this);
		this.textOverFlowHandler = this.textOverFlowHandler.bind(this);
	}

	//PARSE HTML
	HTMLparser(text) {
		const parser = new DOMParser();
		const testDOC = parser.parseFromString(text, 'text/html');

		let parsedText = testDOC.documentElement.textContent;
		return parsedText;
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

	render() {
		const { productID, selectedCurrency } = this.props;

		if (!productID) {
			return <Navigate to={'/'} />;
		} else {
			return (
				<Query query={GET_PRODUCTS_BY_ID} variables={{ productId: productID }}>
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
						console.log(galleryOverflow);
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
										{this.HTMLparser(productObj.description) ||
											'something went wrong'}
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
		// products: state.products,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

export default connect(mapStateToProps)(ProductDescription);
