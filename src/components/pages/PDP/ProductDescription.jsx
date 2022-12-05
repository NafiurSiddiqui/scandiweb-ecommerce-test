import React, { Component } from 'react';
import DescriptionCard from '../../UI/DescriptionCard';
import Button from '../../UI/Button';
import { connect } from 'react-redux';
import { GET_ALL_CATEGORIES } from '../Category/CategoryList';
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';

/**
 * @className - 'PDP' = product description
 */

// const QueryByID = (id) => {
// 	const GET_PRODUCT_BY_ID = gql`
// 		query{
// 			product(id:"${id}"){
// 				id
// 				name
// 			}
// 		}
// 	`;
// };

class ProductDescription extends Component {
	HTMLparser(products) {
		// console.log(this.props.productIDState.productID);
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

		// const parsedParagraph = testDOC.getElementsByTagName('p');

		// let paraContent = parsedParagraph[0]?.textContent;

		// if (paraContent) {
		// 	console.log(paraContent);
		// 	return paraContent;
		// }

		// const allSpanEl = testDOC.getElementsByTagName('span');

		// for (const el of allSpanEl) {
		// 	// console.log(el.innerHTML);
		// 	let allSpanText = parser.parseFromString(el.innerHTML, 'text/html');
		// 	console.log(allSpanText.documentElement.textContent);
		// }
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
