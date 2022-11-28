import { gql } from '@apollo/client';

import { Component } from 'react';
import CategoryAll from './All';

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
		// console.log('one time!');
	}
	render() {
		return (
			<section className={'category'}>
				<div>
					<h1 className={'category-title'}>Category Name</h1>
				</div>

				<ul className={'category-items'}>
					<CategoryAll />
				</ul>
			</section>
		);
	}
}
export default CategoryList;
