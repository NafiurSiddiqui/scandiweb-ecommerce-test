import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../../store/productsSlice';
import CategoryCard from './CategoryCard';
import { GET_ALL_CATEGORIES } from './CategoryList';

/**
 * @TASK -
 * Product brand and name are shown at the same line
 */

class CategoryAll extends Component {
	constructor() {
		super();

		this.getProductsHandler = this.getProductsHandler.bind(this);
	}

	componentDidMount(el) {
		this.getProductsHandler(el);
	}
	//Get products
	getProductsHandler(el) {
		this.props.setProducts(el);
	}
	render() {
		return (
			<Query
				query={GET_ALL_CATEGORIES}
				onCompleted={(data) => this.getProductsHandler(data)}
			>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';
					const products = data.category.products;

					const allProducts = products?.products?.category?.products;
					// console.log(allProducts);
					const prices = allProducts?.map((item, i) =>
						item.prices.map((item) => {
							return {
								currency: item.currency.label,
								symbol: item.currency.symbol,
							};
						})
					);

					//currencies captured here
					const currencies = products.map((item) =>
						item.prices.map((item) => {
							return {
								currency: item.currency.label,
								symbol: item.currency.symbol,
							};
						})
					);

					// console.log(currencies[0].map((item) => item.currency));

					return (
						<>
							<div>
								<h1 className={'category-title'}>All</h1>
							</div>

							<ul className={'category-items'}>
								{products.map((p) => {
									let product = {
										id: p.id,
										image: p.gallery[0],
										name: p.name,
										prices: p.prices.map((item) => item.amount).slice(0, 1),
										stock: p.inStock,
									};

									return (
										<CategoryCard
											key={product.id}
											image={product.image}
											heading={product.name}
											price={product.prices}
											inStock={product.stock}
											productID={p.id}
										/>
									);
								})}
							</ul>
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
		products: state.products,
	};
};

const mapDispatchToProps = { setProducts };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAll);
