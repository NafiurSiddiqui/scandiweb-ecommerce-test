import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { GET_ALL_CATEGORIES } from './CategoryList';
import CategoryCard from './CategoryCard';
import DisplayHeader from '../../Layout/DisplayHeader';
import Skeleton from '../../Layout/skeleton';

export default class CategoryClothes extends Component {
	render() {
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data)
						return <Skeleton style={{ display: 'block' }} />;

					const products = data.category.products;

					const clothes = products.filter(
						(item) => item.category === 'clothes'
					);

					return (
						<>
							<DisplayHeader>Clothes</DisplayHeader>

							<ul className={'category-items'}>
								{clothes.map((p) => {
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
