import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { GET_ALL_CATEGORIES } from './CategoryList';

export default class CategoryAll extends Component {
	render() {
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					// console.log(client);
					if (loading || !data) return 'Loading ... ';
					const products = data.category.products;
					console.log(
						products.map((p, i) => {
							if (p.prices[i] === undefined) {
								return;
							}
							return p.prices[i].currency.symbol;
						})
					);
					// return products.map((p, index) => <CategoryCard key={p.id} image={p.gallery[0]} heading={p.name} price={p.prices[0]} currency={p.}/>);
				}}
			</Query>
		);
	}
}
