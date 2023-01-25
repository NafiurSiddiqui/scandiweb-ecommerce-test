import { gql } from '@apollo/client';
import { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

const CategoryAll = lazy(() => import('./CategoryAll'));
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
						<Route path="*" element={<Navigate to={'/'} />} />
					</Routes>
				</Suspense>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		protductIDState: state.category,
	};
};

export default connect(mapStateToProps)(CategoryList);
