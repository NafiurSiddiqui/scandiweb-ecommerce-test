import { gql } from '@apollo/client';
import { Component } from 'react';
import CategoryCard from './CategoryCard';

export const GET_ALL_CATEGORIES = gql`
	query {
		category {
			products {
				category
				id
				name
				inStock
				gallery
				description
				attributes {
					id
					name
					type
					items {
						displayValue
						value
						id
					}
				}
				prices {
					currency {
						label
						symbol
					}
					amount
				}
				brand
			}
		}
	}
`;

class CategoryList extends Component {
	componentDidMount() {
		console.log('one time!');
	}
	render() {
		return (
			<section className={'category'}>
				<div>
					<h1 className={'category-title'}>Category Name</h1>
				</div>

				<ul className={'category-items'}>
					{/* <Query query={GET_ALL_CATEGORIES}>
						{({ error, loading, data, client }) => {
							if (error) return `something went wrong !!! ${error} `;
							// console.log(client);
							if (loading || !data) return 'Loading ... ';
							const products = data.category.products;
							console.log(products);
							return products.map((p, index) => (
								<div key={index}>{p.brand}</div>
							));
						}}
					</Query> */}
					<CategoryCard />
				</ul>
			</section>
		);
	}
}
export default CategoryList;
