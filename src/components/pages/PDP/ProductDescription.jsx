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
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';
					const products = data.category.products;

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
