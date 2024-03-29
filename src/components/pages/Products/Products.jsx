import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayHeader from '../../Layout/DisplayHeader';
import DisplayMessage from '../../Utilities/DisplayMessage';
import Skeleton from '../../Layout/skeleton';
import ContentWrapper from '../../Layout/ContentWrapper';
import { userCurrency } from '../../Utilities/userCurrency';
import { GET_PRODUCTS_BY_CATEGORY } from '../../Utilities/query';
import ProductCard from './ProductCard';
import { getProductID } from '../../store/productsSlice';

class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activePath: '',
		};
		this.formatQueryTerm = this.formatQueryTerm.bind(this);
	}

	formatQueryTerm(queryTerm) {
		const { activePath } = this.state;

		const formattedHeading =
			queryTerm.charAt(0).toUpperCase() + queryTerm.slice(1) ||
			activePath.charAt(0).toUpperCase() + activePath.slice(1);

		return formattedHeading;
	}

	render() {
		const { selectedCurrency, currentPath, getProductID } = this.props;

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
										<ProductCard
											key={product.id}
											image={product.image}
											heading={`${product.brand} ${product.name}`}
											price={product.prices}
											currencySymbol={selectedCurrency?.symbol}
											inStock={product.stock}
											productID={p.id}
											products={products}
											getProductID={getProductID}
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
		selectedCurrency: state.currency.selectedCurrency,
		currentPath: state.path.currentPath,
	};
};

export default connect(mapStateToProps, { getProductID })(Products);
