import { gql } from '@apollo/client';
import { Component } from 'react';
import CategoryClothes from './Clothes';

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

//Category-title should be coming from each Category* component

class CategoryList extends Component {
	render() {
		return (
			<section className={'category'}>
				<div>
					<h1 className={'category-title'}>All</h1>
				</div>

				<ul className={'category-items'}>
					{/* <CategoryAll /> */}
					<CategoryClothes />
				</ul>
			</section>
		);
	}
}
export default CategoryList;
