import React, { Component } from 'react';
import DescriptionCard from '../../UI/DescriptionCard';
import Button from '../../UI/Button';
import { connect } from 'react-redux';
import { GET_ALL_CATEGORIES } from '../Category/CategoryList';
import { Query } from '@apollo/client/react/components';
import ProgressiveImage from '../../Utilities/ProgressiveImage';

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
		let itemID = this.props.productIDState.productID;

		if (!itemID) {
			return;
		}

		let selectedProduct = products.filter((item) => item.id === itemID);

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
		let itemID = this.props.productIDState.productID;

		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';

					const { products } = data.category;
					//getting the right data
					let filteredProduct = products.filter((item) => item.id === itemID);

					//return PDP as an OBJECT
					let PDP = filteredProduct.map((item) => {
						return {
							brand: item.brand,
							name: item.name,
							images: item.gallery,
							attributesID: item.attributes.map((item) => item.id),
							attributesItem: item.attributes.map((item) =>
								item.items.map((item) => item.id)
							),
							prices: item.prices.filter(
								(item) => item.currency.label === 'USD'
							),
							get amount() {
								return this.prices[0].amount;
							},
						};
					});

					let galleryOverflow = PDP[0].images.length > 6;

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
									<DescriptionCard products={PDP} priceHeading={true} />
									<Button className="pdp__cart-btn">ADD TO CART</Button>
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
										{this.HTMLparser(products)}
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

const mapStateToProps = (state) => {
	return {
		productIDState: state.category,
	};
};

export default connect(mapStateToProps)(ProductDescription);
