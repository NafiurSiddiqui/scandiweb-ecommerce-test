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
		// console.log(selectedProduct[0].description);
		/**
		 * @availableElements -
		 * ul > li
		 * h3 > p
		 */

		const checkElements = testDOC.getElementsByTagName('*');

		//if <p>.. parse <p>
		//else <li>..parse li

		const parsedParagraph = testDOC.getElementsByTagName('p');
		// console.log();
		let paraContent = parsedParagraph[0]?.textContent;

		if (paraContent) {
			console.log(paraContent);
		}

		const allSpanEl = testDOC.getElementsByTagName('span');

		for (const el of allSpanEl) {
			// console.log(el.innerHTML);
			let allSpanText = parser.parseFromString(el.innerHTML, 'text/html');
			console.log(allSpanText.documentElement.textContent);
		}
	}

	render() {
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';
					const products = data.category.products;

					// console.log(this.props.productIDState.productID);

					// let itemID = this.props.productIDState.productID;
					// console.log(itemID);
					// console.log();
					// let selectedProduct = products.filter((item) => item.id === itemID);

					this.HTMLparser(products);

					// const parser = new DOMParser();

					// const testDOC = parser.parseFromString(
					// 	selectedProduct[0].description,
					// 	'text/html'
					// );

					// const parsedParagraph = testDOC.getElementsByTagName('p');

					// console.log(parsedParagraph[0].innerHTML);

					return (
						<>
							<section className="pdp">
								<div className="pdp-image">
									<div className="pdp-image-gallery">image gallery</div>

									<div className="pdp-hero-image">hero image</div>
								</div>
								<DescriptionCard />
								<Button>ADD TO CART</Button>
								<p className="pd__description">
									{/* {selectedProduct[0] ? selectedProduct[0].description : null} */}
								</p>
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
