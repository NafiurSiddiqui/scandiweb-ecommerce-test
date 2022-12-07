import React, { Component } from 'react';
import DescriptionCard from '../../UI/DescriptionCard';
import Button from '../../UI/Button';
import { connect } from 'react-redux';
import { GET_ALL_CATEGORIES } from '../Category/CategoryList';
import { Query } from '@apollo/client/react/components';

/**
 * @className - 'PDP' = product description
 */

class ProductDescription extends Component {
	constructor() {
		super();
		// this.test = this.test.bind(this);
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

	render() {
		let itemID = this.props.productIDState.productID;
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';

					const { products } = data.category;

					let filteredProduct = products.filter((item) => item.id === itemID);
					// console.log(filteredProduct);

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
						};
					});
					/**
					 * some product attribute length === 0, then return
					 * else, see the kind of attributes they have.size or color or multiple attributes? get attributes
					 */
					console.log(PDP);

					let currencyAmount = PDP[0].prices[0].amount;

					// let filteredItems = filteredProduct[0].attributes.map((item) => {
					// 	return [item.id, item.items];
					// });

					// console.log(filteredItems.map((item) => item[0]));
					// let items = filteredItems.map((item) => item[1]);

					// for (let i = 0; i < items.length; i++) {
					// 	console.log(items[i].map((item) => item.id));
					// }

					return (
						<>
							<section className="pdp">
								<div className="pdp-image">
									<div className="pdp-image-gallery">image gallery</div>

									<div className="pdp-hero-image">hero image</div>
								</div>
								<DescriptionCard />
								<Button>ADD TO CART</Button>
								<p className="pd__description">{this.HTMLparser(products)}</p>
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
