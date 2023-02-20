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
import { withRouter } from 'react-router-dom';

class Categories extends Component {
	render() {
		const { selectedCurrency, products } = this.props;

		console.log(this.props.location);

		const matchedUserPrice = userCurrency(products, selectedCurrency);
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data }) => {
					if (error) return;
					<DisplayMessage error={error} />;

					if (loading || !data) return <Skeleton />;

					const products = data.category.products;

					const tech = products.filter((item) => {
						console.log('It runs');
						return item.category === 'tech';
					});
					const clothes = products.filter(
						(item) => item.category === 'clothes'
					);

					return (
						<ContentWrapper>
							<DisplayHeader>Tech</DisplayHeader>

							<ul className={'category-items'}>
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
							</ul>
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

export default withRouter(connect(mapStateToProps)(Categories));
