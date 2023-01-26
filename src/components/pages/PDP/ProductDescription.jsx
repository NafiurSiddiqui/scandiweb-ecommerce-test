import React, { Component } from 'react';
import DescriptionCard from '../../UI/DescriptionCard';

import { connect } from 'react-redux';
import { GET_ALL_CATEGORIES } from '../Category/CategoryList';
import { Query } from '@apollo/client/react/components';
import ProgressiveImage from '../../Utilities/ProgressiveImage';
import { setSelectedProduct } from '../../store/productsSlice';
import { addItemToCart } from '../../store/cartSlice';
import productHandler from '../../Utilities/ProductHandler';
import { Navigate } from 'react-router-dom';
import DisplayMessage from '../../Utilities/DisplayMessage';
import Skeleton from '../../Layout/skeleton';

/**
 * @className - 'PDP' = product description
 * @Tasks -
 * multiple attributes of the same item, can be selected and should be rendered accordingly.
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
	HTMLparser(products) {
		const { productID } = this.props;

		if (!productID) {
			return;
		}

		let selectedProduct = products.filter((item) => item.id === productID);

		const parser = new DOMParser();

		const testDOC = parser.parseFromString(
			selectedProduct[0].description,
			'text/html'
		);

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
			console.log(productID);
			return <Navigate to={'/'} />;
		} else {
			return (
				<Query query={GET_ALL_CATEGORIES}>
					{({ error, loading, data }) => {
						if (error)
							return (
								<DisplayMessage error={true}>
									Something went wrong.
								</DisplayMessage>
							);
						if (loading || !data) return <Skeleton />;

						const { products } = data.category;

						//items extracted from product handler
						const [PDP, galleryOverflow, attributes] = productHandler(
							products,
							productID,
							selectedCurrency
						);

						return (
							<>
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
											{PDP[0].images.map((item, index) => (
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
													: PDP[0].images[0]
											}
										/>
									</div>
									<article className="pdp_pd">
										<DescriptionCard
											products={PDP[0]}
											priceHeading={true}
											getItemValues={this.getItemValues}
											attributes={attributes}
											className="pd"
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
											{this.HTMLparser(products) || 'something went wrong'}
										</p>
									</article>
								</section>
							</>
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
		products: state.products,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

const mapDispatchToProps = { setSelectedProduct, addItemToCart };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
