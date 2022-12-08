import React, { Component } from 'react';
import DescriptionCard from '../../UI/DescriptionCard';
import Button from '../../UI/Button';
import { connect } from 'react-redux';
import { GET_ALL_CATEGORIES } from '../Category/CategoryList';
import { Query } from '@apollo/client/react/components';
import ProgressiveImage from '../../Utilities/ProgressiveImage';

/**
 * @className - 'PDP' = product description
 */

class ProductDescription extends Component {
	constructor() {
		super();

		this.state = {
			selectedImgSrc: '',
		};

		this.selectedImgSrcHandler = this.selectedImgSrcHandler.bind(this);
	}

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

	selectedImgSrcHandler(src) {
		this.setState({
			selectedImgSrc: src,
		});
	}

	render() {
		console.log(this.state.selectedImgSrc);
		let itemID = this.props.productIDState.productID;
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';

					const { products } = data.category;
					//getting the right data
					let filteredProduct = products.filter((item) => item.id === itemID);
					//returning PDP as an OBJECT
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
					/**
					 * some product attribute length === 0, then return
					 * else, see the kind of attributes they have.size or color or multiple attributes? get attributes
					 */

					return (
						<>
							<section className="pdp">
								<div className="pdp-image">
									<div className="pdp-image-gallery">
										{PDP[0].images.map((item, index) => (
											<ProgressiveImage
												src={item}
												key={item}
												onClick={this.selectedImgSrcHandler}
											/>
										))}
									</div>

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
									<DescriptionCard />
									<Button>ADD TO CART</Button>
									<p className="pd__description">{this.HTMLparser(products)}</p>
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
