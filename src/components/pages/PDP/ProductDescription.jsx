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

const QueryByID = (id) => {
	const GET_PRODUCT_BY_ID = gql`
		query{
			product(id:"${id}"){
				id
				name
			}
		}
	`;
};

class ProductDescription extends Component {
	render() {
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';
					const products = data.category.products;
					// console.log(this.props.productIDState);
					let itemID = this.props.productIDState.productID;
					console.log(itemID);
					// console.log();
					let selectedProduct = products.filter((item) => item.id === itemID);

					console.log(selectedProduct);

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
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Delectus, voluptates! Voluptas facere cupiditate reprehenderit
									cum quo libero, aliquid fuga obcaecati.
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
