import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayHeader from '../../Layout/DisplayHeader';
import DisplayMessage from '../../Utilities/DisplayMessage';
import Skeleton from '../../Layout/skeleton';
import ContentWrapper from '../../Layout/ContentWrapper';
import { userCurrency } from '../../Utilities/userCurrency';
import { GET_PRODUCTS_BY_CATEGORY } from '../../Utilities/query';
import CategoryCard from './CategoryCard';
import productHandler, { attHandler } from '../../Utilities/ProductHandler';

class Categories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activePath: '',
		};
		this.formatQueryTerm = this.formatQueryTerm.bind(this);
	}

	componentDidMount() {
		this.setState({
			activePath: 'all',
		});
	}

	formatQueryTerm(queryTerm) {
		const { activePath } = this.state;

		const formattedHeading =
			queryTerm.charAt(0).toUpperCase() + queryTerm.slice(1) ||
			activePath.charAt(0).toUpperCase() + activePath.slice(1);

		return formattedHeading;
	}

	render() {
		const { selectedCurrency, products, currentPath } = this.props;
		// const matchedUserPrice = userCurrency(products, selectedCurrency);
		const queryTerm = currentPath.replace('/', '');

		return (
			<Query
				query={GET_PRODUCTS_BY_CATEGORY}
				variables={{ category: queryTerm }}
			>
				{({ error, loading, data }) => {
					if (error) return <DisplayMessage error={error} />;

					if (loading || !data) return <Skeleton />;

					const products = data.category.products;

					const matchedUserPrice = userCurrency(
						products,
						selectedCurrency,
						false
					);

					console.log(products);

					return (
						<ContentWrapper>
							<DisplayHeader>{this.formatQueryTerm(queryTerm)}</DisplayHeader>

							<ul className={'category-items'}>
								{products.map((p, i) => {
									let product = {
										id: p.id,
										image: p.gallery[0],
										name: p.name,
										brand: p.brand,
										prices: matchedUserPrice[i]?.amount,
										stock: p.inStock,
									};

									return (
										<CategoryCard
											key={product.id}
											image={product.image}
											heading={`${product.brand} ${product.name}`}
											price={product.prices}
											currencySymbol={selectedCurrency?.symbol}
											inStock={product.stock}
											productID={p.id}
											// attributes={attributes}
											products={products}
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
		currentPath: state.path.currentPath,
	};
};

export default connect(mapStateToProps)(Categories);
