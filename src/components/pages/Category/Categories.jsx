import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_ALL_CATEGORIES } from './CategoryList';
import CategoryCard from './CategoryCard';
import DisplayHeader from '../../Layout/DisplayHeader';
import DisplayMessage from '../../Utilities/DisplayMessage';
import Skeleton from '../../Layout/skeleton';
import ContentWrapper from '../../Layout/ContentWrapper';
import { userCurrency } from '../../Utilities/currency';
import { GET_PRODUCTS_BY_CATEGORY } from '../../Utilities/query';

class Categories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activePath: window.location.pathname.replace('/', ''),
		};
	}
	//! 1. check the active path
	//! 2. query the category
	//!3. render accordingly
	//* window.location.pathname.replace('/', '') === '' //meaning 'All'

	render() {
		const { selectedCurrency, products } = this.props;
		const { activePath } = this.state;
		const matchedUserPrice = userCurrency(products, selectedCurrency);
		return (
			<Query query={GET_PRODUCTS_BY_CATEGORY} variables={{ activePath }}>
				{({ error, loading, data }) => {
					console.log(data);
					if (error) return <DisplayMessage error={error} />;

					if (loading || !data) return <Skeleton />;

					// const products = data.category.products;

					// const tech = products.filter((item) => {
					// 	console.log('It runs');
					// 	return item.category === 'tech';
					// });
					// const clothes = products.filter(
					// 	(item) => item.category === 'clothes'
					// );

					return (
						<ContentWrapper>
							<DisplayHeader>Tech</DisplayHeader>

							{/* <ul className={'category-items'}>
								{tech.map((p, i) => {
									let product = {
										id: p.id,
										image: p.gallery[0],
										name: p.name,
										prices: matchedUserPrice[i]?.amount,
										stock: p.inStock,
									};
									return (
										<CategoryCard
											key={product.id}
											image={product.image}
											heading={product.name}
											price={product.prices}
											currencySymbol={selectedCurrency?.symbol}
											inStock={product.stock}
											productID={p.id}
										/>
									);
								})}
							</ul> */}
						</ContentWrapper>
					);
				}}
			</Query>
		);
	}
}

export const mapStateToProps = (state) => {
	return {
		productIDState: state.category,
		products: state.products.products,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

export default connect(mapStateToProps)(Categories);
