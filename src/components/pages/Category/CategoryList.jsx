import { gql } from '@apollo/client';
import { Component, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const CategoryAll = lazy(() => import('./All'));
const CategoryClothes = lazy(() => import('./Clothes'));
const CategoryTech = lazy(() => import('./Tech'));

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
	render() {
		return (
			<section className={'category'}>
				<Suspense fallback={<span>Loading...</span>}>
					<Routes>
						<Route path="/" element={<CategoryAll />} />
						<Route path="clothes" element={<CategoryClothes />} />
						<Route path="tech" element={<CategoryTech />} />
					</Routes>
				</Suspense>
			</section>
		);
	}
}
export default CategoryList;
