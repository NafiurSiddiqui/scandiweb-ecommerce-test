import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import CategoryCard from './CategoryCard';
import { GET_ALL_CATEGORIES } from './CategoryList';

export default class CategoryAll extends Component {
	render() {
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';
					const products = data.category.products;

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
									};
									return (
										<CategoryCard
											key={product.id}
											image={product.image}
											heading={product.name}
											price={product.prices}
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
