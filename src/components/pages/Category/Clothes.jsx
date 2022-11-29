import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { GET_ALL_CATEGORIES } from './CategoryList';

export default class CategoryClothes extends Component {
	render() {
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';
					const products = data.category.products;

					// return products.map((p, i) => {
					// 	let product = {
					// 		id: p.id,
					// 		image: p.gallery[0],
					// 		name: p.name,
					// 		prices: p.prices.map((item) => item.amount).slice(0, 1),
					// 	};

					// products
					// 	.map((p) => {
					// 		return p.category;
					// 	})
					// 	.filter((item) => item === 'clothes')
					const clothes = products
						.filter(({ category }) => category === 'clothes')
						.map(({ name, prices, gallery }) => {
							return [name, prices, gallery[0]];
						});
					console.log();
					// 	return (
					// 		<CategoryCard
					// 			key={product.id}
					// 			image={product.image}
					// 			heading={product.name}
					// 			price={product.prices}
					// 		/>
					// 	);
					// });
				}}
			</Query>
		);
	}
}
