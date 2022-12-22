import React, { Component } from 'react';
import DescriptionCard from '../../UI/DescriptionCard';
import Button from '../../UI/Button';
import { connect } from 'react-redux';
import { GET_ALL_CATEGORIES } from '../Category/CategoryList';
import { Query } from '@apollo/client/react/components';
import ProgressiveImage from '../../Utilities/ProgressiveImage';
import { setSelectedProduct } from '../../store/productsSlice';

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
		this.getSelectedProduct = this.getSelectedProduct.bind(this);
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

	//get selected product item here
	getSelectedProduct(data) {
		const { productID, selectedCurrency } = this.props;
		//filter the data
		let filteredProduct = data?.filter((item) => item.id === productID);

		//convert to obj
		let PDP = filteredProduct.map((item) => {
			return {
				brand: item.brand,
				name: item.name,
				images: item.gallery,
				attributesID: item.attributes.map((item) => item.id),
				attributesItem: item.attributes.map((item) =>
					item.items.map((item) => item.id)
				),
				// prices: item.prices.filter(
				// 	(item) => item.currency.label === 'USD'
				// ),
				prices: item.prices.filter((item) => {
					if (selectedCurrency !== null) {
						return item.currency.label === selectedCurrency.currency;
					} else {
						return item.currency.label === 'USD';
					}
				}),
				get amount() {
					return this.prices[0].amount;
				},
			};
		});

		this.props.setSelectedProduct(PDP[0]);

		return PDP[0];
	}

	render() {
		const { productID, selectedCurrency, setSelectedProduct } = this.props;

		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';

					const { products } = data.category;
					// getting the right data
					let filteredProduct = products.filter(
						(item) => item.id === productID
					);

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
							// prices: item.prices.filter(
							// 	(item) => item.currency.label === 'USD'
							// ),
							prices: item.prices.filter((item) => {
								if (selectedCurrency !== null) {
									return item.currency.label === selectedCurrency.currency;
								} else {
									return item.currency.label === 'USD';
								}
							}),
							get amount() {
								return this.prices[0].amount;
							},
						};
					});
					//gallery overflow guard
					let galleryOverflow = PDP[0].images.length > 6;

					//capture PDP for global use
					// setSelectedProduct(PDP);
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
									<DescriptionCard
										products={PDP[0]}
										priceHeading={true}
										className="pd"
									/>
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
		productID: state.category.productID,
		products: state.products,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

const mapDispatchToProps = { setSelectedProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
