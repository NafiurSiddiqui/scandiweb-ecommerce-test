import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { GET_ALL_CATEGORIES } from './CategoryList';
import CategoryCard from './CategoryCard';

export default class CategoryTech extends Component {
	render() {
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';
					const products = data.category.products;

					const tech = products.filter((item) => item.category === 'tech');

					//! RETURN AMOUNT BASED ON THE CURRENCY > LABEL 👇 DO NOT delete the prices

					// const prices = clothes
					// 	.map((item) => item[1])
					// 	.flatMap((item) => item)
					// 	.filter((item) => item.currency.label === 'USD');

					return (
						<>
							<div>
								<h1 className={'category-title'}>Tech</h1>
							</div>

							<ul className={'category-items'}>
								{tech.map((p) => {
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
